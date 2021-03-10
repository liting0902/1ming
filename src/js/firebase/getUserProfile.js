import { accountConverter, userAccount } from '../../js/firebase/userInfoConvertor.js'
export const getUserProfile = (uid) => {
    return firebase.firestore()
            .collection('account')
            .withConverter(accountConverter)
            .doc(uid).get();
}

