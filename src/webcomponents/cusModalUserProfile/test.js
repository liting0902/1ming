import firebaseConfig from '../../projectConfig/firebaseProj.config.js'
firebase.initializeApp(firebaseConfig);

let auth = firebase.auth();
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('btnVerifyNumber', {
    'size': 'invisible',
    'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
    }
});

let idProxy = {
    iptEmail: "iptEmail",
    iptPassword: "",
    iptPhone: "",
    iptVerifyCode: "",
    btnSendVerifyCode: "",
    btnVerifyNumber: "",
    btnDeleteNumber: "",
    // btnAddNumber:"",
    btnRegister: "",
    btnSignout: "",
    googlesign: ''
}
let elementProxy = new Proxy(idProxy, {
    get: (target, prop) => {
        let ele = document.querySelector(`#${prop}`)
        return ele
    },
    set: (target, prop, value) => {
        return target[prop] = value

    }
});


btnDeleteNumber.addEventListener('click', () => {

})
btnRegister.addEventListener('click', () => {
    let email = iptEmail.value;
    let password = iptPassword.value;
    auth.createUserWithEmailAndPassword(email, password).then((user) => {
        Swal.fire({
            title: '登入成功',
            icon: 'success'
        })
    }).catch((e) => {
        Swal.fire({
            title: "Fail to register!",
            text: `${e}`,
            icon: "info",
        });
    });

});



btnVerifyNumber.addEventListener('click', () => {
    let phone = iptPhone.value;
    console.log(typeof phone)
    console.log(phone)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phone, appVerifier)

        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult)
            if (confirmationResult)
                Swal.fire({
                    icon: 'success',
                    title: '電話認證碼已送出'
                });
        }).catch((error) => {
            console.log("LOG: ~signInWithPhoneNumber~ error", error)
            Swal.fire({
                text: `${error}`
            });

        });
})
btnSendVerifyCode.addEventListener('click', () => {
    let code = iptVerifyCode.value;
    confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        if (user) {
            Swal.fire({
                text: "電話驗證成功",
                icon: 'success'
            })
        }
    }).catch((error) => {
        Swal.fire({
            text: `${error}`,
            icon: 'warning'
        })
        // User couldn't sign in (bad verification code?)
        // ...
    });
})
btnDeleteNumber.addEventListener('click', () => {
    auth.unlink('phone').then().catch()
})
// btnAddNumber.addEventListener('click', () => {

// })

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log("LOG: ~ file: test.js ~ line 67 ~ firebase.auth ~ user", user)
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});
btnSignout.addEventListener('click', () => {
    auth.signOut().then((result) => {
        Swal.fire({
            title: "登出成功"
        })
    }).catch((e) => {
        console.log(e);
    });
})
googlesign.addEventListener('click', () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function (result) {
            // Google user signed in. Check if phone number added.
            if (!result.user.phoneNumber) {
                // Ask user for phone number.
                var phoneNumber = window.prompt('Provide your phone number');
                // You also need to provide a button element signInButtonElement
                // which the user would click to complete sign-in.
                // Get recaptcha token. Let's use invisible recaptcha and hook to the button.
                var appVerifier = new firebase.auth.RecaptchaVerifier(
                    signInButtonElement, {
                        size: 'invisible'
                    });
                // This will wait for the button to be clicked the reCAPTCHA resolved.
                return result.user.linkWithPhoneNumber(phoneNumber, appVerifier)
                    .then(function (confirmationResult) {
                        // Ask user to provide the SMS code.
                        var code = window.prompt('Provide your SMS code');
                        // Complete sign-in.
                        return confirmationResult.confirm(code);
                    }).catch((e) => {
                        console.log(e)
                    })
            }
        })
        .catch(function (error) {
            // console.log(error);
        });
})