import { accountConverter, userAccount } from './userInfoConvertor'
let updateUserProfile = (uid, email, phone, dateRegistered, name, address) => {

    let userData = {
        uid,
        email,
        name,
        phone,
        address,
        date: dateRegistered
    }

    firebase.firestore().collection('account').doc(uid)
        .withConverter(accountConverter)
        .set(new userAccount(userData.uid, userData.email, userData.phone, userData.date, userData.name, userData.address))
        .then(() => {
            console.log('更新成功!');
            Swal.fire({
                title: '更新資料成功!',
                icon: 'success'
            });

        }).catch((error) => {
            console.log("updateUserProfile: ", error)
        });

    // firebase.firestore().collection('account').doc(uid).set(userData, {
    //         merge: true
    //     })
    //     .then(() => {
    //         console.log('更新成功!');
    //     }).catch((error) => {
    //         console.log("updateUserProfile: ", error)
    //     });

}
export default updateUserProfile;