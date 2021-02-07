const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
export default (operation, index, currentQty) => {
    
    return {
        type: UPDATE_QUANTITY,
        payload:{
            operation, 
            index,
            currentQty
            
        }
        
    }
}