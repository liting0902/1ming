import React, { Component } from 'react'
import 'bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

import {addToCart} from '../actions/shopAction';
// import propTypes from 'prop-types';

class ProductCard extends Component {
    constructor(props) {
        super(props)
    }

    addItem = (name, price) => {
        this.props.addToCart(name, price);
    }
    render() {

        return <div>
            {this.props.arrGroupItem.map((item, j) => {
                let i =this.props.categoryId;
                let name = this.props.productList[i].arrGroupItem[j].name;
                let price = this.props.productList[i].arrGroupItem[j].price;
        
                return <div className={'groupProd '} key={j}>
                    <div className={'thumbnail'}><img src={item.imgUrl} alt={`${item.name}`}></img></div>
                    <div >
                        <h6>{item.name}</h6>
                        <h6 className={"prodPrice"}>${item.price}</h6>
                    
                        <button className={'btn btn-dark'} onClick={(e) => { this.addItem(name, price) }}><i className="fas fa-cart-arrow-down"></i>加入購物車</button>
                    </div>
                
                </div>
            })}
        </div>
    }
}
function mapStateToProps(state){
    return{
        productList: state.productList,
        
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        addToCart
    }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductCard);