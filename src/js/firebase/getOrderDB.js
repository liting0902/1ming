
import { orderInfo, orderInfoConverter } from './orderInfoConvertor.js'
export const getOrderDB =  async (uid) => {
    let snap = await firebase.firestore().collection('account').doc(uid).collection('orderList')
    .withConverter(orderInfoConverter)
    .get();
    console.log(snap.docs.length)
    let orderDataList = []
    snap.docs.map(( snapShot, i ) => {
        let data = snapShot.data();
    let  idData = {...data, 'id':i}
    orderDataList.push(idData)
    
    })
    
    return orderDataList
}