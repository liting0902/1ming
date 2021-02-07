import userDataRegisterToDB from '../../js/firebase/userDataRegisterToDB.js';

export default class cusModalLogin extends HTMLElement {
    constructor(templateContent) {
        super();
        this.templateContent = templateContent;
        this.appendTemplate(this.templateContent);
        this.setAuth_getRedirectResult();
        this.proxyUI = {
            bindPersistenceLogin: true,
            onSignup: false,
            onPwdReset: false,
            onLogin: true,
            bindIptLoginEmail: "",
            bindIptLoginPwd: "",
            bindIptRegisterEmail: "",
            bindIptRegisterPwd1: "",
            bindIptRegisterPwd2: "",
            bindIptResetPwdEmail: "",
        }
        this.proxyUI = new Proxy(this.proxyUI, {
            get: (target, prop) => {
                let elem = this.querySelector(`[${prop}]`)
                if (prop === "bindPersistenceLogin")
                    return elem.checked;
                else
                    return elem.value;
                // return target[prop];
            },
            set: (target, prop, value) => {
                switch (prop) {
                    case 'onSignup':
                        let [...onSignup] = this.getElementsByClassName('onSignup')
                        console.log(onSignup)
                        onSignup.forEach((element) => {
                            element.checked = true
                        })
                        break;
                    case 'onPwdReset':
                        let [...onPwdReset] = this.getElementsByClassName('onPwdReset')
                        console.log(onPwdReset)
                        onPwdReset.forEach((element) => {
                            element.checked = true
                        })
                        break;
                    case 'onLogin':
                        let [...onLogin] = this.getElementsByClassName('onLogin')
                        onLogin.forEach((element) => {
                            element.checked = true
                        })
                        console.log('to Login')
                        break;
                    case 'bindPersistenceLogin':
                        let bindPersistenceLogin = this.querySelector('[bindPersistenceLogin]')
                        bindPersistenceLogin.checked = true;
                        console.log("LOG: ~ file: cusModalLogin.js ~ line 54 ~ cusModalLogin ~ constructor ~ bindPersistenceLogin.checked", bindPersistenceLogin.checked)
                    default:
                        let elem = this.querySelector(`[${prop}]`)
                        elem.value = value;
                        break;
                }
                return target[prop] = value;
            }
        });

    }
    appendTemplate = (templateContent) => {
        if (templateContent)
            this.appendChild(templateContent);
        let divSignup = this.querySelector('#divSignup');
        let divPwdReset = this.querySelector('#divPwdReset');
        divSignup.addEventListener('click', (i) => {
            this.proxyUI.onSignup = true;
        })
        divPwdReset.addEventListener('click', () => {
            this.proxyUI.onPwdReset = true;
        });
        let returnArrow = this.querySelector('.returnArrow');
        returnArrow.addEventListener('click', () => {
            this.proxyUI.onLogin = true;
        })

        let formLogin = this.querySelector('.formLogin');
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            this.Email_Login().then((email) => {
                console.log(typeof email)
                // var name = email.match(/^([^@]*)@/)[1];
                let name = email.split('@')[0]
                Swal.fire({
                    title: `Hi ${name} , welcome aboard`,
                    icon: 'success'
                });

            });
            this.isShowModal(false);


        })
        
        let formPwdReset = this.querySelector('.formPwdReset');
        formPwdReset.addEventListener('submit', (e) => {
            e.preventDefault();
            let email = this.proxyUI.bindIptResetPwdEmail;
            console.log('---', this.proxyUI.bindIptResetPwdEmail)
            this.Email_ResendPassword(email);
            this.proxyUI.onLogin = true;
        })


        let formSignup = this.querySelector('.formSignup');
        formSignup.addEventListener('submit', (e) => {
            e.preventDefault();
            this.Email_Register();
            this.isShowModal(false);
        })

        let btnLoginGoogle = this.querySelector('.btnLoginGoogle');
        btnLoginGoogle.addEventListener('click', (e) => {
            e.preventDefault();
            this.signinViaGoogle();
            this.setAuth_getRedirectResult().then((result) => {
                console.log(result)
            })


        })


    }; // appendTemplate ends

    setAuth_getRedirectResult = () => {
        return firebase.auth()
            .getRedirectResult()
            .then((result) => {
                console.log("LOG: ~ get redirect result", result.user.email)

                // The signed-in user info.
                var user = result.user;
                let email = user.email;
                let name = email.split('@')[0]
                if(user){
                    Swal.fire({
                        title: `Hi ${name} , welcome aboard`,
                        icon: 'success'
                    });
                }
                return user
                console.log(user.email)
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(`Get redirect result: code/${errorCode}, message/${errorMessage}`)
            });
    };


    Email_Login = () => {
        let email = this.proxyUI.bindIptLoginEmail;
        let password = this.proxyUI.bindIptLoginPwd;
        let persistence = this.getPersistence(this.proxyUI.bindPersistenceLogin)
        console.log(persistence)
        return firebase.auth().setPersistence(persistence).then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    console.log(user)
                    return user.user.email;

                    // Signed in 
                    // ...
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    Swal.fire({
                        title: 'Fail to Log in',
                        text: `${errorMessage}`,
                        icon: 'warning',
                        button: 'close'
                    });
                });
        })
        
    };

    signinViaGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        let persistence = this.getPersistence(this.proxyUI.bindPersistenceLogin)
        return firebase.auth().setPersistence(persistence).then(() => {
            return firebase.auth().signInWithRedirect(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                console.log("LOG: ~ file: 1.htm ~ line 44 ~ firebase.auth ~ user", user)
            });
        })
    }

    Email_ResendPassword = (email) => {
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            Swal.fire({
                title:'密碼重設已寄出',
                text: '密碼重新設定連結已寄出, 請至信箱收信',
                icon: 'success'
            });
        }).catch((e) => {
            Swal.fire({
                title: 'Failed',
                icon: 'warning',
                text:`${e.code}`
            });
            console.log(e)
        })
    };

    Email_Register = () => {
        let email = this.proxyUI.bindIptRegisterEmail;
        let p1 = this.proxyUI.bindIptRegisterPwd1;
        let p2 = this.proxyUI.bindIptRegisterPwd2;
        let password = p1 === p2 ? p1 : Swal.fire({
            title: "錯誤!",
            text: "確認密碼輸入需相同!",
            icon: "warning",
            button: "Close",
        });
        console.log(email, password)

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("LOG: ~ line 228 ~ cusModalLogin ~ user", user.uid, user.email)
                Swal.fire({
                    text: `註冊且登入成功`,
                    button: 'Close'
                });
            
                userDataRegisterToDB();
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(`Email_Register~ ${errorCode}: ${errorMessage}`)
                Swal.fire({
                    title: "Fail to register!",
                    text: `${errorMessage}!`,
                    icon: "warning",
                    button: "Close",
                });
            });
    };

    isShowModal(isShow) {
        if (isShow == true)
            $('#modalLogin').modal('show')
        else
            $('#modalLogin').modal('hide');
    };

    getPersistence(isKeepSignin) {
        if (isKeepSignin)
            return window.firebase.auth.Auth.Persistence.LOCAL
        else
            return window.firebase.auth.Auth.Persistence.NONE
    };


}

// setFirebase(){};
// getErrorMessageZHTW(){};