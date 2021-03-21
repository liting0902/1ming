const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_QUANTITY = "UPDATE_QUANTITY";
const DELETE_ITEM = "DELETE_ITEM";
const ORDER_CHECK_OUT="ORDER_CHECK_OUT";
// const CLEAR_SHOPCART = "CLEAR_SHOPCART";
export function addToCart(nameAdd, price,thumbnailUrl){
    
    return {
        type: ADD_TO_CART,
        payload: {
            name:nameAdd, 
            price,
            quantity:1,
            thumbnailUrl
    }
}
}
export function updateQuantity(operation,productName){
    console.log("update action")
    return {
        type: UPDATE_QUANTITY,
        payload: {
            operation,
            productName:productName
        }
    }
}
export function deleteItem(nameToBeDeleted){
    return {
        type: DELETE_ITEM,
        payload: {
            nameToBeDeleted:nameToBeDeleted
        }
    }
}
export function orderCheckOut(){
    return {
        type:  ORDER_CHECK_OUT,
    }
}
// export function clearShopCart(){
//     return {
//         type: CLEAR_SHOPCART
//     }
// }