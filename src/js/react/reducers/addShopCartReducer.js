
import { updateOrder } from '../../firebase/updateOrder.js';

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
        console.log("delete an itme in shopcart reducer")
        let _state = [...state].filter((element) => element.name !== action.payload.nameToBeDeleted);
        console.log("LOG: Item in shopcart:", _state)
        return _state

    }
    if (action.type === "ORDER_CHECK_OUT") {
        console.log(uid)
        let reducer = (accumulator, currentValue) => accumulator + currentValue;
        let summary = state.map((item) => item.price * item.quantity).reduce(reducer)
        let orderItemList = [...state]
        if(orderItemList)
        updateOrder(uid, summary ,orderItemList )    


    }
    return state
}