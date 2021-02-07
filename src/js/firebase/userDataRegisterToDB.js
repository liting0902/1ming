/**
 * @param {function userDataRegisterToDB(user.uid,user.email) { }}
 * @param {string} uid 
 * @param {string} email 
 */
let userDataRegisterToDB = () => {
    firebase.auth().onAuthStateChanged(
        (user) => {
            console.log('userDataToDB', user.uid, user.email)
            let newUserData = {  
                uid : user.uid,          
                email : user.email,
                phone: user.phoneNumber,                
                date : new Date()
            }
            let uid = user.uid;
            firebase.firestore().collection('account').doc(uid).set(newUserData,{merge:true})
            .then(() => {
                console.log('新人註冊成功!');
            }).catch((error) => {
                console.log("userDataRegisterToDB: ",error)
            });
        }
    )
    
}
export default userDataRegisterToDB;