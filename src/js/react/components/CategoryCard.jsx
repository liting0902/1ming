import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import ProductCard from './ProductCard.jsx'
import './prodCard.css';

// import products from '../../../../adminData/products.json';
// let _ = require('lodash')
// import dataGroup from '../../firebase/productData.js';

class CategoryCard extends Component {
    constructor(props) {
        super();
        // console.log(props.productList)
        this.productData = props.productList        

    };
    render() {
        const productGroup = this.productData.map((data, i) => {
            return (<div className={'prodCard'}  key={i}>
                <h2 className={'cateName'} id={data.groupName}> {data.groupNameZTW}</h2>
                <div >
                <ProductCard categoryId={i} arrGroupItem={data.arrGroupItem}></ProductCard>
                </div>
            </div>)
        })

        return <div >
            {productGroup}
        </div>
    }
}
function mapStateToProps(state){
    return{
        productList: state.productList,
        
    }
}


export default connect(mapStateToProps)(CategoryCard);
