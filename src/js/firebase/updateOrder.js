
import Swal from 'sweetalert2'
import { orderInfo, orderInfoConverter } from './orderInfoConvertor.js'
function orderID(uid) {

    let gettime = new Date().getTime()
    let substrtUserID = uid.substr(0, 9)
    let orderID = `${substrtUserID}${gettime}`
    return orderID
}


/**
 * @param {string} uid userID
 * @param {number} summary order total price
 * @param {Array} orderItemList order-item-list 
 */
export const updateOrder = (uid, summary, orderItemList) => {
    let d = new Date();
    let strDate = d.toString();
    let _orderID = orderID(uid)
    let orderData = {
        uid,
        summary,
        orderItemList,
        date: strDate,
        orderID : _orderID
    }

    firebase.firestore().collection('account').doc(orderData.uid).collection('orderList').doc(_orderID)
        .withConverter(orderInfoConverter)
        .set(new orderInfo(orderData.date, orderData.summary, orderData.orderItemList, orderData.orderID)).then((doc) => {
            console.log("order sent ")
            Swal.fire({
                title:'訂單送出成功!',
                text:'請至我的訂單查詢',
                icon:'success'
            })
        }).catch((error) => {
            Swal.fire({
                title:'訂單失敗',
                icon:'warning'
            })
            console.log("Error getting document:", error);
        });
}
