import React, { Component } from 'react';
import './prodCard.css';

// import products from '../../../../adminData/products.json';
// let _ = require('lodash')
// import dataGroup from '../../firebase/productData.js';

export default class CategoryCards extends Component {
    constructor(props) {
        super();
        this.productData = [...props.data]
        this.state = {
            amount:"1"
        }

    };
    increase = (index) => {
        console.log(this.state.amount)
    }
    decrease = (index) => {
        console.log(index)
    }
    render() {
        // let this.productData = [...this.props.data]
        const productGroup = this.productData.map((data, i) => {

            let GroupItem = data.group.map((item, j) => {
                // console.log("LOG: ~ file: CategoryCard.jsx ~ line 29 ~ CategoryCards ~ groupItem ~ item", item)
                return <div className={'groupProd'} key={j}>
                    <img className={'prodImg'} src={item.imgUrl} alt="alternatetext"></img>
                    <li className={'prodName'}>{item.name}</li>
                    <li className={'prodPrice'}>${item.price}</li>
                    <button onClick={() => {this.increase(j)}}>+</button>
                    <span className={''}>{this.state.amount}</span>                    
                    <button onClick={() => {this.decrease(j)}}>-</button>
                    
                </div>
            })

            return (<div className={'prodCard'}  key={i}>
                <h2 className={'cateName'}> {data.groupName}</h2>
                <div >
                    {GroupItem}
                </div>
            </div>)
        })

        return <div >
            {productGroup}
        </div>
    }
}