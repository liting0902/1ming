import React ,{Component} from 'react'
import ProdCard from '../components/ProdCard.jsx';
import NavButton from '../components/NavButton.jsx'
// let products = require('../../../../adminData/products.json') ;
import dataGroup from '../../firebase/productData.js';
import './ProductList.css'

let _ = require('lodash')

export default class ProductList extends Component{
    constructor(props){
        super();    
    }
    render(){

        return <div className={'productListMain'}>
            <div className={''}>
            <h2>產品菜單</h2>
        <NavButton categoryName = {dataGroup}></NavButton>
            </div>
            
        <ProdCard productList={dataGroup}></ProdCard>
        </div>
    }
}