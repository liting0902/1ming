import React ,{Component} from 'react';
import ShopCart from '../components/ShopCart.jsx'
import ProductList from './ProductList.jsx'

export default class OrderPage extends Component{
    constructor(){
        super();
    }
    render(){
        return<React.Fragment>
            <div className={'orderMain d-lg-flex justify-content-around '}>
            <ProductList></ProductList>
            <ShopCart></ShopCart>
            </div>
            
        </React.Fragment>
    }
}