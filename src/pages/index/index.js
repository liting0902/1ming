import $ from 'jquery';
import 'bootstrap';
import Swal from 'sweetalert2';
import 'babel-polyfill'; //es6+ to es5
import {
    firebase
} from '@firebase/app';
// var firebase = require('firebase/app');
require('firebase/auth');
import 'firebase/firestore';

import { useComponent } from '../../js/useComponent/useComponent.js'; // webComponent API
//webComponent css
import './index.css';
import '../../webcomponents/cusFullPageScroll/fullPageScroll.css';
import '../../webcomponents/cusModalLogin/cusModalLogin.css';
import '../../webcomponents/cusModalUserProfile/cusModalUserProfile.css';
//webComponent JS
import cusFullPageScroll from '../../webcomponents/cusFullPageScroll/fullPageScroll.js';
import cusModalLogin from '../../webcomponents/cusModalLogin/cusModalLogin.js';
import cusModalUserProfile from '../../webcomponents/cusModalUserProfile/cusModalUserProfile.js';
import signOut from '../../js/firebase/signOut.js';
//firebase intialized config
var firebaseConfig = require('../../projectConfig/firebaseProj.config.json');
firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();
window.firebase = firebase;

// let proxyPageSwitch ={
    // orderPage.classList.add("d-none")
    //     orderSummary.classList.add("d-none")
    //     appendFullPage.hidden=true
    // aUserLogin.classList.add('d-none');
    //         liUserDropdown.classList.remove('d-none')
    //         spanDisplayEmail.innerHTML = ` ${nameDisplay} 登入中`;
// }

let aUserLogin = document.querySelector('#aUserLogin');
let liUserDropdown = document.querySelector('#liUserDropdown');
let spanDisplayEmail = document.querySelector('#spanDisplayEmail');
let aMyOrder = document.querySelector('#aMyOrder');
let aMyProfile = document.querySelector('#aMyProfile');
let aLogout = document.querySelector('#aLogout');
let aOrderPage = document.querySelector('#aOrderPage');
let pageStatic = document.querySelector('#pageStatic')
let pageReact = document.querySelector('#pageReact');  
let orderPage = document.querySelector('#orderPage');
let orderSummary = document.querySelector('#orderSummary');

let [...scrollElement] = document.querySelectorAll('a[stactic-page]')
scrollElement.map((e) => {
    e.addEventListener('click', () => {
        console.log('news ----------------------------')
        appendFullPage.hidden=false
        orderPage.classList.add("d-none")
        orderSummary.classList.add("d-none")
    })
})

aMyOrder.addEventListener('click', () => {
    console.log('my order click',orderSummary)
    // window.history.replaceState(null,null,'orderSummary')
    // window.history.pushState(null, null, 'orderSummary/');
    // window.pushUrl('/orderSummary#')
    // console.log(window.pushUrl('/orderSummary'))
    // pageStatic.classList.add("d-none")
    appendFullPage.hidden=true
    orderSummary.classList.remove("d-none")
    orderPage.classList.add("d-none")
})
aOrderPage.addEventListener('click', () => {
    console.log('go order',orderPage)
    // window.pushUrl('/orderPage')
    // window.history.pushState(null, null, 'orderPage');
    orderPage.classList.remove("d-none")
    orderSummary.classList.add("d-none")
    // pageStatic.classList.add("d-none")
    // body.removeChild()
    appendFullPage.hidden=true
    // console.log("LOG: ~ file: index.js ~ line 57 ~ aOrderPage.addEventListener ~ appendFullPage.hidden", appendFullPage.hidden)
    // console.log()
})


let appendFullPage
useComponent('cus-full-page-scroll', '../../webcomponents/cusFullPageScroll/fullPageScroll.htm', cusFullPageScroll)
    .then((htmlTemplate) => {
        let fullPageTemplate = new htmlTemplate.ctor(htmlTemplate.templateContent);
        console.log('append FullPageScroll')
        appendFullPage = fullPageTemplate;
        pageStatic.appendChild(fullPageTemplate);
    })
let appendModalLogin = () => {
    useComponent('cus-modal-login', '../../webcomponents/cusModalLogin/cusModalLogin.htm', cusModalLogin)
        .then((loginModal) => {
            let loginTemplate = new loginModal.ctor(loginModal.templateContent);
            document.body.appendChild(loginTemplate);
            console.log('append ModalLogin')
        })
}

let appendUserProfile = () => {
    useComponent('cus-user-profile', '../../webcomponents/cusModalUserProfile/cusModalUserProfile.htm', cusModalUserProfile)
        .then((userProfile) => {

            let userProfileTemplate = new userProfile.ctor(userProfile.templateContent);
            document.body.appendChild(userProfileTemplate);
            console.log('append UserProfile')

        })
}




let setAuth_getRedirectResult = () => {
    return firebase.auth().getRedirectResult().then((result) => {
        console.log("LOG: ~ get redirect result", result.user.email)

        // The signed-in user info.
        return result
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(`Get redirect result: code/${errorCode}, message/${errorMessage}`)
    });
};
aMyProfile.addEventListener('click', () => {
    $("#modalProfile").modal('show')
});
let uid = null;
let onAuthStateChanged = () => {
    firebase.auth().onAuthStateChanged((user) => {
        let nameDisplay;
        if (user) {
            window.uid = user.uid
            uid = window.uid
            nameDisplay = user.email;
            aUserLogin.classList.add('d-none');
            liUserDropdown.classList.remove('d-none')
            spanDisplayEmail.innerHTML = ` ${nameDisplay} 登入中`;
            appendUserProfile();

        } else {
            appendModalLogin();
        }
        user ? console.log('new login === ', {
            dispalyName: user.dispalyName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
        }) : console.log('No user is signed in.')

    })
}
onAuthStateChanged();

aLogout.addEventListener('click', () => {
    signOut();

})
