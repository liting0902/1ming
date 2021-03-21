
import Swal from 'sweetalert2';
import { updateOrderToDB } from '../../firebase/updateOrderToDB.js';

export default (state = [], action) => {

    if (action.type === "ADD_TO_CART") {
        console.log("ADD_TO_CART reducer")
        let mapName = state.map((element) => element.name)
        let shopItemExisted = mapName.includes(action.payload.name)
        let index = mapName.indexOf(action.payload.name)
        if (shopItemExisted) {
            let _state = [...state]
            _state[index].quantity++;
            return _state
        }

        if (!shopItemExisted) {
            let newState = [...state, action.payload];
            return newState
        }
    }
    if (action.type === "UPDATE_QUANTITY") {
        let mapName = state.map((e) => e.name)
        let index = mapName.indexOf(action.payload.productName)
        let _state = [...state]

        if (action.payload.operation === '+')
            _state[index].quantity++;
        if (action.payload.operation === '-') {
            (_state[index].quantity > 1) ? (_state[index].quantity--) : (_state.splice(index, 1))
        }
        return _state
    }
    if (action.type === "DELETE_ITEM") {
        let _state = [...state].filter((element) => element.name !== action.payload.nameToBeDeleted);
        return _state

    }
    if (action.type === "ORDER_CHECK_OUT") {
        let reducer = (accumulator, currentValue) => accumulator + currentValue;
        let summary = state.map((item) => item.price * item.quantity).reduce(reducer)
        let orderItemList = []
        if(typeof(uid)=='undefined'){
            Swal.fire({
                title:'請先登入',
            icon:'warning'
            })
        }else if(state.length>0 && typeof(uid) !== 'undefined'){
            orderItemList = [...state]
            console.log("LOG: ~ file: addShopCartReducer.js ~ line 49 ~ orderItemList", orderItemList)
            let displayConfirm = orderItemList.map((element) => {
                let itemPrice = element.quantity*element.price
                return `<span>${element.name}x${element.quantity} : ${itemPrice}</span>`
            });
            Swal.fire({
                title:`請確認訂單內容 總金額$${summary}`,
                html:`${displayConfirm}`,
                icon:'info',
                showCancelButton: true,
                confirmButtonColor: '#9E4700',
                cancelButtonColor: '#4C3A2C',
                confirmButtonText: '確認並成立訂單',
                cancelButtonText: '重返並變更',
            }).then(async(result) => {
                if(result.isConfirmed){                
                    await updateOrderToDB(uid, summary ,orderItemList);                    
                    let resetState = [];
                    return resetState;
                }
            }).then((resetState) => {
                state=resetState;
                console.log("LOG: ~ file: addShopCartReducer.js ~ line 79 ~ orderItemList", state)
            })
            
        }else {
            Swal.fire({
                title:'購物車內無商品',
                icon:'warning',
                showCloseButton: true,
            })
            }
            console.log("//////////", state)
            return state
        }
    return state
}