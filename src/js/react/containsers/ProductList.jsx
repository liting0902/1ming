import React, { Component } from 'react'
import CategoryCard from '../components/CategoryCard.jsx';
import NavButton from '../components/NavButton.jsx'
// let products = require('../../../../adminData/products.json') ;
import dataGroup from '../../firebase/productData.js';
import './orderPage.css'


let _ = require('lodash')

export default class ProductList extends Component {
    constructor(props) {
        super();
    }
    render() {

        return <React.Fragment>
            <div className={'productHeader'}>
                    <NavButton categoryName={dataGroup}></NavButton>
                </div>
            <div className={'productListMain'}>
                
                {/* <CategoryCard productList={dataGroup}></CategoryCard> */}
                <CategoryCard ></CategoryCard>

            </div>
        </React.Fragment>

    }
}