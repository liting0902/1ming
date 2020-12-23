/**@enum {string} */
// .radioLogin, .radioSignup, .radioPwdReset
const ENUM_switchPage = {
    radioLogin: "radioLogin",
    radioSignup:"radioSignup",
    radioPwdReset:"radioPwdReset"
}

export default class cusModalLogin extends HTMLElement{
    /**@param {HTMLElement} templateContent */
    /**@param {import("./csuModalLogin").plugins;} */
    constructor(templateContent, plugins){
        super();
        /**{Swal, Email_ResendPassword()} */
        this.plugins = plugins;
        this.firebase = null;
        this.db = null;

        if(window.firebase)
        this.setFirebase(window.firebase);

        if(templateContent)
        this.appendTemplate(templateContent);

        /**
         * 
         * @param {number} a 
         * @param {number} b 
         */
        function add(a,b){
            return a+b
        }
        //initial value
        this.proxyUI = {
            /**@prop {string} - checked or value*/
            bindIptSigninEmail: '',
            bindIptSigninPWD:'',
            bindIptRegisterEmail:'',
            bindIptRegisterPWD1:'',
            bindIptRegisterPWD2:'',
            bindIptResentPwdEmail:'',
            bindCkboxSigninKeepIn:false,
            switchPage: ENUM_switchPage.radioLogin
        }

        let self = this;
        this.proxyUI = new Proxy(this.proxyUI,{
            /**@param {string} prop */
            get:(target,prop) => {
                /**@type {HTMLInputElement} */
                let elem =this.querySelector([`${prop}`])
                if(prop==='bindCkboxSigninKeepIn')
                return elem.checked
                else
                return elem.value;
            }
            ,
            set:(target,prop,value) => {
                let elem;
                switch (prop){
                    case 'switchPage' :
                        switch (value){
                            case ENUM_switchPage.radioLogin:
                                elem = self.querySelector('.modal-header .radioLogin');
                                elem.checked = true;

                                let ckboxLogin = self.querySelector('.modal-body .ckboxLogin')
                                ckboxLogin.checked = true;
                                console.log("switchPage to radioLogin")
                                break;
                            case ENUM_switchPage.radioSignup:
                                elem = this.querySelector('.modal-header .radioSignup')
                                elem.checked = true;
                                let ckboxSignup = self.querySelector('.modal-body .ckboxSignup')
                                ckboxSignup.checked = true;
                                console.log("switchPage to radioSignup")
                                break;
                                // case ENUM_switchPage.radioForgetPwd:
                                // elem = self.querySelector('.modal-header .radioPwdReset');
                                // elem.checked = true;
                                
                                // this.querySelector('.modal-body .ckboxPwdReset').checked = true;
                                // break;

                            case ENUM_switchPage.radioPwdReset:
                                this.querySelector('.modal-header .radioPwdReset').checked = true;
                                this.querySelector('.modal-body .ckboxPwdReset').checked = true;
                                // this.querySelector('.modal-body .ckboxPwdReset').checked = true;
                                console.log("switchPage radioPwdReset")
                                break;
                            default:
                                console.log("error in switchPage")
                                break;
                        }
                        return true
                        break;
                default:
                    elem = self.querySelector(`[${prop}]`);
                    if (prop === "bindCkboxSigninKeepIn")
                    elem.checked = value
                    else 
                    elem.value = value;
                    break;    
                }
                return true;
            }
            
        });
        
        // Set proxyUI.switchPage value
        let backArrow = this.querySelector('.modal-header .backArrow')
        backArrow.addEventListener('click', (e) => {
            this.proxyUI.switchPage = ENUM_switchPage.radioLogin;
        })
        // Goto Signup Page
        let divSignupHtm = this.querySelector('.modal-body .divSignupHtm')
        divSignupHtm.addEventListener('click', (e) => {
            this.proxyUI.switchPage = ENUM_switchPage.radioSignup;
        })
        // Goto ForgetPWD page
        let divForgetPassword = this.querySelector('.modal-body .divForgetPassword')
        divForgetPassword.addEventListener('click', (e) => {
            this.proxyUI.switchPage = ENUM_switchPage.radioPwdReset;
        })

    };// constructor ends
    
    appendTemplate(templateContent) {
        this.appendChild(templateContent);
        console.log("100:" ,this)
        
    };//appendTemplateends

    setFirebase(_firebase){
        this.firebase = _firebase;
        this.db = this.firebase.firestore();
        this.setAuth_getRedirectResult();    
    };//setFirebase ends
    setAuth_getRedirectResult(){
        // let self = this;
        this.firebase.auth().getRedirectResult().then((result) => {
        // console.log("LOG: ~ file: cusModalLogin.js ~ line 112 ~ cusModalLogin ~ appendTemplate ~ this", this)
        // console.log("LOG: ~ file: cusModalLogin.js ~ line 112 ~ cusModalLogin ~ appendTemplate ~ self", self)
            
            if(result.user){
                this.showModal(false);
            };
        }
        ).catch((error) => {
        console.log("cusModalLogin ~ setAuth_getRedirectResult ~ error", error);
            
        }
        );
    };//setAuth_getRedirectResult ends
    /**@function - show tha modal login */
    /**@param {boolean} isShow */
    showModal(isShow){
        let iptEmail = this.querySelector('.modal .loginForm input[type="email"]');
        $('#modalLogin').on('shown.bs.modal',() => {
            iptEmail.focus(); // once the modal popped up the cursor stay in the Email input
        })
        let action = null;
            if (isShow == true)
            action = 'show';
            else 
            action = 'hide';
            $('#modalLogin').modal(action);
    };//showModal ends
    //('../../js/firebase/FirebaseMJS.js')
    /**@param {import('../../js/firebase/FirebaseMJS.js').Email_ResendPassword(emailAddress, inFirebase, swal, funcCloseModal)} */
    Email_ResendPassword(_email){
        // let self = this;
        return this.plugins.Email_ResendPassword(
            _email,
            window.firebase,
            this.plugins.Swal,
            ()=>{
                this.showModal(false);
                this.proxyUI.switchPage = ENUM_switchPage.radioLogin; //after resending PWD ,back to radioLogin
            }
        )
    };//Email_ResendPassword ends
    Email_Register(){
        let email = this.proxyUI.bindIptRegisterEmail;
        let password = this.proxyUI.bindIptRegisterPWD1;
        let persistence = this.getPersistence(this.proxyUI.bindCkboxSigninKeepIn);
        this.firebase.auth().setPersistence(persistence).then(() => {
            return this.firebase.auth().createWithEmailAndPassword(email, password);
        }
        ).then(() => {
            let user = this.firebase.auth().currentUser;
            return user.sendEmailVerification();
        }
        ).catch((error_Email_Register) => {
            console.log(`LOG:error_Email_Register: ${error_Email_Register.code} : ${error_Email_Register.message}`)   
        }
        );

    };//Email_Register ends
    getPersistence(isCkboxSigninKeepIn){
        if(isCkboxSigninKeepIn)
            return window.firebase.auth.Auth.Persistence.LOCAL;
        else 
            return window.firebase.auth.Auth.Persistence.NONE;
    };//getPersistence ends
    Email_Login(){
        let email = this.proxyUI.bindIptSigninEmail;
        let password = this.proxyUI.bindIptSigninPWD;
        let persistence = this.getPersistence(this.proxyUI.bindCkboxSigninKeepIn);
        // let self = this;
        this.firebase.auth().setPersistence(persistence).then(
            () => {
                this.showModal(false)
                return this.firebase.auth().signInWithEmailAndPassword(email, password)
            }
            
        ).catch((error) => {
            console.log(`LOG~ error in Email_Login: ${error.code}: ${error.message}`)
        }
        );
    

    };//Email_Login ends
    Google_Register_Login(){
        // let self = this;
        let provider = new firebase.auth.GoogleAuthProvider();
        let persistence = this.getPersistence(this.proxyUI.bindCkboxSigninKeepIn);
        this.firebase.auth().setPersistence(persistence).then(
            () => {
                return this.firebase.auth().signInWithRedirect(provider);
            }            
        ).catch((error) => {
            console.log(`LOG~ error in Google_Register_Login: ${error.code}: ${error.message}`)
        }
        );
    };//Google_Register_Login ends
    getErrorMessageZHTW(){};//getErrorMessageZHTW ends
    

    // appendTemplate(){};
    // setFirebase(){};
    // setAuth_getRedirectResult(){};
    // showModal(isShow){};
    // Email_ResendPassword(){};
    // Email_Register(){};
    // getPersistence(isCkboxSigninKeepIn){};
    // Email_Login(){};
    // Google_Register_Login(){};
    // getErrorMessageZHTW(){};
}