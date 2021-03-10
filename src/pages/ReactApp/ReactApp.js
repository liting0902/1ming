import React from 'react'
import ReactDOM from 'react-dom';
import App from '../../js/react/containsers/App.jsx'
import {Provider} from 'react-redux';
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../../js/react/reducers/rootReducer.js'

const store =createStore(rootReducer, applyMiddleware(thunk));


let divRoot = document.querySelector("#root");

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    , divRoot); 