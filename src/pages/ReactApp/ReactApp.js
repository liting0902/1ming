import React from 'react'
import ReactDOM from 'react-dom';
// import App from '../../js/react/containsers/App.jsx'
import OrderPage from '../../js/react/containsers/OrderPage.jsx';
import OrderSummary from '../../js/react/containsers/OrderSummary.jsx';
import ShopcartIcon from '../../js/react/components/ShopcartIcon.jsx'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../js/react/reducers/rootReducer.js'

const store = createStore(rootReducer, applyMiddleware(thunk));


let divOrderPage = document.querySelector("#orderPage");
let divOrderSummary = document.querySelector("#orderSummary");
let aShopCart = document.querySelector('#aShopCart');
ReactDOM.render(
    <Provider store={store}>
        <OrderPage></OrderPage>
    </Provider>
    , divOrderPage
)
ReactDOM.render(
    <Provider store={store}>
        <OrderSummary></OrderSummary>
    </Provider>
    , divOrderSummary);
ReactDOM.render(
    <Provider store={store}>
        <ShopcartIcon></ShopcartIcon>
    </Provider>
    , aShopCart)