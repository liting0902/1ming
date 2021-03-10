import $ from 'jquery';
import 'bootstrap';
import Swal from 'sweetalert2';
import 'babel-polyfill'; //es6+ to es5
import {
    firebase
} from '@firebase/app';
// var firebase = require('firebase/app');
import 'firebase/auth';
import 'firebase/firestore';

import {useComponent} from '../../js/useComponent/useComponent.js';

import './index.css';
import '../../webcomponents/cusFullPageScroll/fullPageScroll.css';
import '../../webcomponents/cusModalLogin/cusModalLogin.css';
import '../../webcomponents/cusModalUserProfile/cusModalUserProfile.css';

import cusFullPageScroll from '../../webcomponents/cusFullPageScroll/fullPageScroll.js';
import cusModalLogin from '../../webcomponents/cusModalLogin/cusModalLogin.js';
import cusModalUserProfile from '../../webcomponents/cusModalUserProfile/cusModalUserProfile.js';
import signOut from '../../js/firebase/signOut.js';

var firebaseConfig = require('../../projectConfig/firebaseProj.config.json');

firebase.initializeApp(firebaseConfig);
window.firebase = firebase;


window.Swal = Swal;

let aUserLogin = document.querySelector('#aUserLogin');
let liUserDropdown = document.querySelector('#liUserDropdown');
let spanDisplayEmail = document.querySelector('#spanDisplayEmail');
let aMyOrder = document.querySelector('#aMyOrder');
let aMyProfile = document.querySelector('#aMyProfile');
let aLogout = document.querySelector('#aLogout');


useComponent('cus-full-page-scroll', '../../webcomponents/cusFullPageScroll/fullPageScroll.htm', cusFullPageScroll)
    .then((htmlTemplate) => {
        let fullPageTemplate = new htmlTemplate.ctor(htmlTemplate.templateContent);
        console.log('append FullPageScroll')
        document.body.appendChild(fullPageTemplate);
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
aMyProfile.addEventListener('click',() => {    
    $("#modalProfile").modal('show')
});
let uid;

let onAuthStateChanged = () => {
    firebase.auth().onAuthStateChanged((user) => {
        let nameDisplay;
        if (user) {
            window.uid = user.uid
            uid=window.uid
            nameDisplay = user.email;
            aUserLogin.classList.add('d-none');
            liUserDropdown.classList.remove('d-none')
            spanDisplayEmail.innerHTML = ` ${nameDisplay} 登入中`;
            appendUserProfile();
            
        }else{
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
