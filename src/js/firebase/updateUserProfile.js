let updateUserProfile = (uid, name, address,phone) => {

    let userData = {
        'uid': uid,
        'name': name,
        'address': address,
        'phone':phone
    }
    firebase.firestore().collection('account').doc(uid).set(userData, {
            merge: true
        })
        .then(() => {
            console.log('成功!');
        }).catch((error) => {
            console.log("updateUserProfile: ", error)
        });



}
export default updateUserProfile;