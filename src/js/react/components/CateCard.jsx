import React, { Component } from 'react'
import 'bootstrap';
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
                return <div className={'groupProd '} key={j}>
                    <div className={'thumbnail'}><img src={item.imgUrl} alt={`${item.name}`}></img></div>
                    <div >
                    <h6>{item.name}</h6>
                    <h6 className={"prodPrice"}>${item.price}</h6>
                    {/* <li className={'prodName'}>{item.name}</li> */}
                    {/* <li className={'prodPrice'}>${item.price}</li> */}
                    <button className={'btn btn-dark'} onClick={(e) => { this.increment('+', j) }}>+</button>
                    <span >  {item.quantity}  </span>
                    <button className={'btn btn-dark'} onClick={() => { this.decrement('-', j) }}>-</button>
                    </div>
                    
                    {/* <img className={'prodImg'} src={item.imgUrl} alt="alternatetext"></img>
                    <li className={'prodName'}>{item.name}</li>
                    <li className={'prodPrice'}>${item.price}</li>
                    <button className={'btn'} onClick={(e) => { this.increment('+', j) }}>+</button>
                    <span className={''}>{item.quantity}</span>
                    <button className={'btn'} onClick={() => { this.decrement('-', j) }}>-</button> */}
                </div>
            })}
        </div>
    }
}