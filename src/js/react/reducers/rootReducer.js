import React from 'react';
import {combineReducers} from 'redux';
import productListReducer from './productListReducer.js'
import updateQtyReducer from './updateQtyReducer.js'

const rootReducer = combineReducers({
    productList: productListReducer,
    updateQty:updateQtyReducer
});

export default rootReducer;
