import React from 'react'
import ReactDOM from 'react-dom'
// import Product from '../../js/react/containsers/ProductList.jsx'
import ProductLits from '../../js/react/components/ProdCard.jsx'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from '../../js/react/reducers/rootReducer.js'

const store =createStore(rootReducer);

let divRoot = document.querySelector("#root");

ReactDOM.render(
    <Provider store={store}>
        <ProductLits></ProductLits>
    </Provider>
    , divRoot); 