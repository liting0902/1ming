import { accountConverter,userAccount } from './userInfoConvertor'

let userDataRegisterToDB = () => {
    firebase.auth().onAuthStateChanged(
        (user) => {
            console.log('userDataToDB', user.uid, user.email)
            let newUserData = {
                uid: user.uid,
                name:user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                date: new Date(),
            }
            
            firebase.firestore().collection('account').doc(uid)
                .withConverter(accountConverter)
                .set(new userAccount(newUserData.uid, newUserData.email, newUserData.phone, newUserData.date, newUserData.name, null)).then((doc) => {
                    console.log('新人註冊成功!');
                }).catch((error) => {
                    console.log("userDataRegisterToDB: ",error)
                });

        }
    )

}



export default userDataRegisterToDB;