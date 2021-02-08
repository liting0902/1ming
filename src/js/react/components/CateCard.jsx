import React, { Component } from 'react'

// import propTypes from 'prop-types';

export default class ProductCard extends Component {
    constructor(props) {
        super(props)
    }
    increment = (operator,index) => {
        console.log(index)
    }
    decrement = (operator,index) => {
        console.log(index)
    }
    render() {

        return <div>
            {this.props.arrGroupItem.map((item, j) => {
                return <div className={'groupProd'} key={j}>
                    <img className={'prodImg'} src={item.imgUrl} alt="alternatetext"></img>
                    <li className={'prodName'}>{item.name}</li>
                    <li className={'prodPrice'}>${item.price}</li>
                    <button onClick={(e) => { this.increment('+', j) }}>+</button>
                    <span className={''}>{item.quantity}</span>
                    <button onClick={() => { this.decrement('-', j) }}>-</button>
                </div>
            })}
        </div>
    }
}