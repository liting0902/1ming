


export default (state, action ) => {
   
    let newState = 0
    if(action.type==="UPDATE_QUANTITY"){
        
        if(action.payload.operation == "+"){
            [action.payload.index]
            return newState++
        }else{
            return newState--
        }
        
    }
    
    return newState
}