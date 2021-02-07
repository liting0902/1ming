'use strict';


import cusModalLogin from './cusModalLogin.js';
import {
    useComponent
} from '../../js/useComponent/useComponent.js'
(async () => {
    let firebaseConfig;
    await fetch('../../projectConfig/firebaseProj.config.json').then((response) => {
        return response.json();
    }).then((json) => {
        firebaseConfig = json
    })

    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
        user ? console.log('new login === ', {
                dispalyName: user.dispalyName,
                email: user.email,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                uid: user.uid,
            }) :
            console.log('No user is signed in.')
    })
    window.firebase = firebase;
    let newTagName = "cus-modal-login";

    await useComponent(newTagName, './cusModalLogin.htm', cusModalLogin).then((htmlFile) => {

        let modalLoginEle = new htmlFile.ctor(htmlFile.templateContent);
        document.body.appendChild(modalLoginEle);
        //console.log(modalLoginEle)

        modalLoginEle.isShowModal(true);
        return modalLoginEle
    }).then(() => {

    });
    let btnSignOut = document.createElement('button');
    btnSignOut.innerHTML = "test登出"
    let formLogin = document.querySelector('.formLogin')
    console.log("LOG: ~ file: cusModalLogin.use.js ~ line 43 ~ formLogin", formLogin)
    formLogin.appendChild(btnSignOut)
    let signOut = () => {
        firebase.auth().signOut().then((result) => {
            Swal.fire({
                text: `登出成功`,
            });
        }).catch((e) => {
            console.log(e);
        });
    }
    
    formLogin.appendChild(btnSignOut)
    btnSignOut.innerHTML = "append登出";
    btnSignOut.addEventListener('click', (e) => {
        e.preventDefault();
        signOut();
        firebase.auth().onAuthStateChanged((user) => {
            console.log("LOG: ~ file: cusModalLogin.js ~ line 213 ~ firebase.auth ~ user", user)
         
        })
    })



})(); // IIFE ends