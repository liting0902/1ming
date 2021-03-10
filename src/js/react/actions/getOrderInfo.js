const GET_ORDER_INFO = "GET_ORDER_INFO";
import { getOrderDB } from '../../firebase/getOrderDB.js'
export default (uid) => async dispatch => {
        console.log(uid)
        let _orderDataList = await getOrderDB(uid)
            dispatch({
                type: GET_ORDER_INFO,
                payload: _orderDataList
            })
    }
