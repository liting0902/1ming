'use strict';
import { accountConverter, userAccount } from '../../js/firebase/userInfoConvertor.js'
import {getUserProfile} from '../../js/firebase/getUserProfile.js'
import updateUserProfile from '../../js/firebase/updateUserProfile.js';

class ProxyFormData {
    /**@prop {string} */
    iptAccount = ""
    /**@prop {string} */
    iptEmail = ""
    /**@prop {string} */
    iptName = ""
    /**@prop {string} */
    iptPhone = ""
    /**@prop {string} */
    iptAddress = ""
    

}
/**@param {Date} dateRegistered*/
let  dateRegistered ;



export default class cusModalUserProfile extends HTMLElement {
    constructor(templateContent) {
        super();
        this.getUser();
        this.appendTemplate(templateContent);
    }


    appendTemplate = (templateContent) => {

        this.appendChild(templateContent);

        let btnVerifyPhone = this.querySelector('#btnVerifyPhone');
        btnVerifyPhone.addEventListener('click', () => {

            const appVerifier = new firebase.auth.RecaptchaVerifier(btnVerifyPhone, {
                'size': 'invisible',
            })

            let numberValue = iptPhone.value;
            if (numberValue) {
                let _phone = numberValue.split('0')[1];
                let phoneNumber = `+886${_phone}`;
                console.log('驗證phoneNumber', phoneNumber)
                firebase.auth().currentUser.linkWithPhoneNumber(phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        window.confirmationResult = confirmationResult;
                        console.log("LOG:confirmationResult", confirmationResult)

                        Swal.fire({
                            text: '認證碼已送出',
                            icon: 'success'
                        });
                        // ...
                    }).catch((error) => {
                        Swal.fire({
                            text: `btnVerifyPhone${error}`,
                            icon: 'warning'
                        });
                    });

            } else {
                Swal.fire({
                    text: '請輸入電話號碼',
                    icon: 'warning'
                })
            }
        })

        let btnSendVerifyCode = this.querySelector('#btnSendVerifyCode');
        btnSendVerifyCode.addEventListener('click', () => {
            console.log('Send out 123456')
            const code = iptPhoneVerifyCode.value;

            window.confirmationResult.confirm(code).then((result) => {
                const credential = firebase.auth.PhoneAuthProvider.credential(window.confirmationResult.verificationId, code)
                console.log(typeof credential)
                console.log(firebase.auth().currentUser.phoneNumber)
                let phone = firebase.auth().currentUser.phoneNumber;

                if (phone) {
                    Swal.fire({
                        text: '認證成功',
                        icon: 'success'
                    });
                    iptPhone.value = phone;
                    //update
                } else {
                    Swal.fire({
                        text: '認證失敗, 請重新驗證',
                        icon: 'warning'
                    });
                }
            }).catch((error) => {
                Swal.fire({
                    text: `認證失敗${error.message}`,
                    // The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.
                    icon: 'warning'
                });
                console.log(`btnSendVerifyCode:${error}`);
            })
        })

        let btnDeletePhone = this.querySelector('#btnDeletePhone');
        btnDeletePhone.addEventListener('click', () => {
            console.log('btnDeletePhone')
            firebase.auth().currentUser.unlink('phone').then((result) => {
                console.log(result);
                Swal.fire({
                    title: '刪除成功',
                    text: '請重新驗證並更新電話號碼',
                    icon: 'info'
                })
                //update
            }).catch((error) => {
                Swal.fire({
                    text: `${error}`,
                    icon: 'warning'
                })
                console.log(`btnDeletePhone:${error}`);
            });
        })
        let btnResendEmailVerify = this.querySelector('#btnResendEmailVerify');
        btnResendEmailVerify.addEventListener('click', () => {
            console.log('送出email 認證')
            firebase.auth().currentUser.sendEmailVerification().then(() => {
                Swal.fire({
                    text: 'Email認證信已寄出',
                    icon: 'success'
                })
            }).catch((error) => {
                Swal.fire({
                    text: `${error}`,
                    icon: 'warning'
                })
                console.log(`btnResendEmailVerify:${error}`);
            })
        })
        let btnSaveProfile = this.querySelector('#btnSaveProfile');
        let iptAddress = this.querySelector('#iptAddress');

        btnSaveProfile.addEventListener('click', () => {

            let address = iptAddress.value;
            let name = iptName.value;
            let uid = iptAccount.value;
            let email = iptEmail.value;
            let phone = firebase.auth().currentUser.phoneNumber;
            console.log(uid, name, address)
            updateUserProfile(uid, email, phone, dateRegistered, name, address);
            // firebase.firestore().collection('account').doc(uid)..set()
            // .then((/**@type {any}*/e) => {
            //     let userInfo = e.data();
            //     console.log("LOG: ~ file: cusModalUserProfile.js ~ line 201 ~ cusModalUserProfile ~ .then ~ userInfo", userInfo)

            //     // iptName = userInfo.iptName
            //     // iptAddress = userInfo.iptAddress


            // })
        })
        let btnResendPassword = this.querySelector('#btnResendPassword');
        btnResendPassword.addEventListener('click', () => {

            let email = iptEmail.value;
            firebase.auth().sendPasswordResetEmail(email).then(() => {
                Swal.fire({
                    title: '密碼重寄',
                    icon: 'success'
                });
            }).catch((error) => {
                Swal.fire({
                    title: 'Failed',
                    icon: 'warning',
                    text: `${error.code}`
                });
                console.log('btnResendPassword', error)
            })
        })
    }
    isShowModal(isShow) {
        if (isShow == true)
            $('#modalProfile').modal('show')
        else
            $('#modalProfile').modal('hide');
    };

    getUser = async () => {
        // let _uid = iptAccount.value
        const accountSnap = await getUserProfile(uid);
        const account = accountSnap.data();
        if (account !== undefined) {
            console.log(account)
                iptEmail.value = account.email;
                iptPhone.value = account.phone;
                iptAccount.value = account.uid;
                iptName.value = account.name;
                dateRegistered = account.dateRegistered;
        }
        
    }

    /**
     * @param {function ProviderID(providerData) {}}
     * @param {string} providerData user.providerData
     */
    ProviderID = (providerData) => {
        let rtnProviderID = "";
        providerData.map(data => data.providerId).filter((IDitems) => {
            if (IDitems == 'password')
                rtnProviderID = 'password';
            else if (IDitems == 'google.com')
                rtnProviderID = 'google.com';
        })
        return rtnProviderID
    }
    // foo = (email) => {
    //     使用這個方法 , 需要再到firebase 上做一次分析    
    //     firebase.auth().fetchSignInMethodsForEmail(email).then((methods) => {
    //         console.log("LOG: ~ file: cusModalUserProfile.js ~ line 164 ~ cusModalUserProfile ~ firebase.auth ~ methods", methods)
    //         // Do something
    //     });
    // }
    /**
     * @param {function iDisplay(loginProvider,phoneNumber,isEmailVerified ) {} }
     * @param {string} loginProvider 
     * @param {string} phoneNumber user.phoneNumber
     * @param {boolean} emailVerified user.emailVerified
     */
    iDisplay = (loginProvider, phoneNumber, emailVerified) => {
        let iFaEnvelope = this.querySelector('#iFaEnvelope');
        if (loginProvider == 'password') {
            iFaEnvelope.classList.remove('d-none');
            btnResendPassword.classList.remove('d-none');
        }
        if (loginProvider == 'google.com') {
            iFaGoogle.classList.remove('d-none');
        }
        if (phoneNumber) {
            btnVerifyPhone.classList.add('d-none');
            divVerifyCode.classList.add('d-none');
        }
        if (!phoneNumber) {
            btnDeletePhone.classList.add('d-none');
        }
        if (!emailVerified) {
            iFaWarningEmailNotVerified.classList.remove('d-none');
            btnResendEmailVerify.classList.remove('d-none');
        }

    }



} //class cusModalUserProfile ends