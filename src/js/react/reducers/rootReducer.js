import React from 'react';
import {combineReducers} from 'redux';
import productListReducer from './productListReducer';
import addShopCartReducer from './addShopCartReducer';
import getOrderInfoReducer from './getOrderInfoReducer';

const rootReducer = combineReducers({
/**
 * @param {Array} addShopCart
 * @param {Array} productList
 * @param {Array} getOrderInfo
 */
    addShopCart:addShopCartReducer,
    productList: productListReducer,
    getOrderInfo : getOrderInfoReducer

});

export default rootReducer;
