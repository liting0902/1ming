
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
 * @param {Array} orderItemList
 */
export const updateOrderToDB = (uid, summary, orderItemList) => {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    // let month = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',];
    // let m_zh = month[m-1];
    let d = date.getDate();
    let h = date.getHours()+1;
    let min = date.getMinutes()+1;
    let strDate = `${y}/ ${m}/ ${d}  ${h}:${min}`
    console.log("LOG: ~ file: updateOrder.js ~ line 26 ~ updateOrder ~ strDate", strDate)
    // .replace('GMT+0800 (台北標準時間)' , '');
    let _orderID = orderID(uid)
    let orderData = {
        uid,
        summary,
        orderItemList,
        date: strDate,
        orderID : _orderID,
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
