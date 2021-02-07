export default class cusModalLogin extends HTMLElement {
    constructor(templateContent) {
        super();
        this.templateContent = templateContent;
        this.appendTemplate(this.templateContent);
        

    }
    appendTemplate = (templateContent) => {
        this.appendChild(templateContent);
        console.log('this....')
        // var firebaseConfig = {
        //     apiKey: "AIzaSyAQE0eM5lImWNijYayYa6-_gYQKsK1PjUk",
        //     authDomain: "ming2-1a7e1.firebaseapp.com",
        //     databaseURL: "https://ming2-1a7e1.firebaseio.com",
        //     projectId: "ming2-1a7e1",
        //     storageBucket: "ming2-1a7e1.appspot.com",
        //     messagingSenderId: "744313163862",
        //     appId: "1:744313163862:web:0efded707b076b5449abf7",
        //     measurementId: "G-VG9H7FJMQ7"
        // };
        // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);

        let divSignup = this.querySelector('#divSignup');
        let divPwdReset = this.querySelector('#divPwdReset');
        divSignup.addEventListener('click', () => {
            let flipToSignup = this.querySelector('.flipToSignup');
            let radioSignup = this.querySelector('.radioSignup')
            flipToSignup.checked = true;
            radioSignup.checked = true;
            console.log('flipToSignup');
        })
        divPwdReset.addEventListener('click', () => {
            let flipToPwdReset = this.querySelector('.flipToPwdReset');
            let radioPwdReset = this.querySelector('.radioPwdReset')
            flipToPwdReset.checked = true;
            radioPwdReset.checked = true;
            console.log('flipToPwdReset');

        });


        divPwdReset.addEventListener('click', () => {
            let flipToPwdReset = this.querySelector('.flipToPwdReset');
            let radioPwdReset = this.querySelector('.radioPwdReset')
            flipToPwdReset.checked = true;
            radioPwdReset.checked = true;
            console.log('flipToPwdReset');
        });

        let returnArrow = this.querySelector('.returnArrow');
        returnArrow.addEventListener('click', () => {
            let radioLogin = this.querySelector('.radioLogin')
            radioLogin.checked = true;
            let flipToLogin = this.querySelector('.flipToLogin');
            flipToLogin.checked = true;
        })
        // let btnLoginEmail = this.querySelector('.btnLoginEmail')

        let formLogin = this.querySelector('.formLogin');
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            this.Email_Login().then((email) => {
                console.log(typeof email)
                // var name = email.match(/^([^@]*)@/)[1];
                let name = email.split('@')[0]
                swal({
                    title: `Hi ${name} , welcome aboard`,
                    icon: 'success'
                });
            });
        })
        let IptResetPwdEmail = this.querySelector('[bindIptResetPwdEmail]')
        let formPwdReset = this.querySelector('.formPwdReset');
        formPwdReset.addEventListener('submit', (e) => {
            e.preventDefault();
            let email = IptResetPwdEmail.value
            this.Email_ResendPassword(email);
        })

        let btnRegister = this.querySelector('.btnRegister');

        let formSignup = this.querySelector('.formSignup');
        formSignup.addEventListener('submit', (e) => {
            e.preventDefault();
            this.Email_Register();
        })

        let btnLoginGoogle = this.querySelector('.btnLoginGoogle');
        btnLoginGoogle.addEventListener('click', (e) => {
            e.preventDefault();
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider).then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;
                console.log("LOG: ~ file: 1.htm ~ line 44 ~ firebase.auth ~ user", user)
            });
        })

        
    }; // appendTemplate ends

    setAuth_getRedirectResult = () => {
        return firebase.auth()
            .getRedirectResult()
            .then((result) => {
                console.log("LOG: ~ file: cusModalLogin.js ~ line 134 ~ .then ~ result", result)

                // The signed-in user info.
                var user = result.user;
                return user
                console.log(user.email)
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                swal({
                    icon: 'warning',
                    title: `${errorCode}`,
                    text: `${errorMessage}`
                })
            });
    };
  

    Email_Login = () => {
        let iptEmail = this.querySelector('[bindIptLoginEmail]');
        let iptPassword = this.querySelector('[bindIptLoginPwd]');
        let email = iptEmail.value;
        let password = iptPassword.value;
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
                swal({
                    title: 'Fail to Log in',
                    text: `${errorMessage}`,
                    icon: 'warning',
                    button: 'close'
                });
            });
    };

    Email_ResendPassword = (email) => {
        console.log(123)
        firebase.auth().sendPasswordResetEmail(email).then(() => {
            
            swal({
                title: 'Password Rensend',
                icon: 'success'
            });
        }).catch((e) => {
            console.log(e)
        })
    };

    Email_Register = () => {
        let IptRegisterEmail = this.querySelector('[bindIptRegisterEmail]')
        let IptRegisterPwd1 = this.querySelector('[bindIptRegisterPwd1]')
        let IptRegisterPwd2 = this.querySelector('[bindIptRegisterPwd2]')
        let email = IptRegisterEmail.value;
        let p1 = IptRegisterPwd1.value;
        let p2 = IptRegisterPwd2.value;
        let password = p1 === p2 ? p1 : swal({
            title: "錯誤!",
            text: "確認密碼輸入需相同!",
            icon: "warning",
            button: "Close",
        });
        console.log(email, password)

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                swal({
                    text: `註冊且登入成功`,
                    button: 'Close'
                });
                // Signed in 
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(`Email_Register~ ${errorCode}: ${errorMessage}`)
                swal({
                    title: "Fail to register!",
                    text: `${errorMessage}!`,
                    icon: "warning",
                    button: "Close",
                });
            });
    };



    
    isShowModal(isShow) {
        if(isShow == true) 
        $('#modalLogin').modal('show')
        else 
        $('#modalLogin').modal('hide');
        // let data = this.querySelector('#modalLogin')
        // console.log("LOG: ~ file: cusModalLogin.js ~ line 227 ~ cusModalLogin ~ isShowModal ~ data", data)
        // console.log(data)

    };


}









// setFirebase(){};








// getPersistence(isCkboxSigninKeepIn){};







// getErrorMessageZHTW(){};