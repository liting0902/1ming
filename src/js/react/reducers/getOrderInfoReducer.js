
export default (state = [], action) => {
    console.log('getOrderInfoReducer')
    switch (action.type) {
        case 'GET_ORDER_INFO': {
            let newState = action.payload
            console.log("LOG: ~ file: getOrderInfoReducer.js ~ line 9 ~ newState", newState)
            return newState
        }
        default:
            return state
    }
}
