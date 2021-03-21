import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './shopcartIcon.css'
class ShopcartIcon extends Component{
    constructor(props){
        super(props)
    }
    getShopItemAmount = (_array) => {
        let sumAmount = 0 ;
        let amountReducer = (accumulator, currentValue) => accumulator+ currentValue;
        if (_array.length>0){
            let arrAmount = _array.map((element) => element.quantity)
        sumAmount = arrAmount.reduce(amountReducer);
        }
        return sumAmount
    }
    render(){
        return <React.Fragment>
            <i className="fas fa-shopping-cart fa-lg shopcartIcon"><span className="shopItemAmount">{this.getShopItemAmount(this.props.addShopCart)}</span></i>
        </React.Fragment>
    }
}
function mapStateToProps(state) {
    return {
        addShopCart: state.addShopCart
    }
}

export default connect(mapStateToProps)(ShopcartIcon)