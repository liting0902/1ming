import dataGroup from '../../firebase/productData.js';


export default (state, action ) => {
   
    let newState = 0
    if(action.type==="UPDATE_QUANTITY"){
        
        if(action.payload.operation == "+"){
            return newState++
        }else{
            return newState--
        }
        
    }
    
    return newState
}