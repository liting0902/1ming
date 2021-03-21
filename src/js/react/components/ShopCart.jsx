import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './shopCart.css';
import { addToCart, updateQuantity,deleteItem, orderCheckOut} from '.././actions/shopAction';

class ShopCart extends Component {
    constructor(props) {
        super(props);

    }

    totalPrice = (array) => {
        let total = 0;
        if (array.length > 0) {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            let arrPrice = array.map((item) => item.price*item.quantity)
            total = arrPrice.reduce(reducer);
        }
        return total
    }

    incrementQty = (operation,productName) => {
    console.log("LOG: ~ file: ShopCart.jsx ~ line 24 ~ ShopCart ~ productName,currentQty", productName)
        this.props.updateQuantity(operation,productName)
    }
    decrementQty = (operation,productName) => {
        console.log("LOG: ~ file: ShopCart.jsx ~ line 24 ~ ShopCart ~ productName", productName)
            this.props.updateQuantity(operation,productName)
        }
    
    render() {
        // console.log('++in ShopCart', this.props.addShopCart)
        let total = this.totalPrice(this.props.addShopCart)

        let shopCartItem = this.props.addShopCart.map((item, i) => {
            let itemPrice = item.quantity*item.price
            return <div key={i} className="shopCartItem">         
                    <div className="d-flex justify-content-between">
                        <div >{item.name}  ${itemPrice}</div> 
                        <div className={'d-flex '}>
                        <button className=" btn" onClick={() => this.incrementQty('+',`${item.name}`)}> <i className="fas fa-plus"></i> </button>
                        <div className="py-3">{item.quantity}</div>
                        <button className=" btn" onClick={() => this.decrementQty('-',`${item.name}`)}> <i className="fas fa-minus"></i> </button>
                        <button className=" btn " onClick={() => this.props.deleteItem(`${item.name}`)}> <i className="fas fa-trash-alt"></i></button>
                        </div>
                        
                    </div>
               
                {/* <div className="cartBodyFloat d-lg-none d-flex align-items-center ">
                    <p>{item.name}</p>
                </div> */}
            </div>
        });
        return <React.Fragment>           

                <div className="d-flex flex-column">
                    <h4 className="">購物車 </h4>
                    {shopCartItem}
                    
                    <div className="d-flex justify-content-between m-2">
                        <div className=" px-2"><em>總金額 : $ {total} </em></div>
                        <div className=" px-2"><button className={'btn btnCheckOut'} onClick={() => this.props.orderCheckOut()}> 送出訂單</button></div>
                    </div>
                </div>

        </React.Fragment>
    }
}

function mapStateToProps(state) {
    return {
        addShopCart: state.addShopCart
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart,updateQuantity,deleteItem,orderCheckOut
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopCart);