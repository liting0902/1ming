import React ,{Component} from 'react'
import ProdCard from '../components/ProdCard.jsx';
import NavButton from '../components/NavButton.jsx'
// let products = require('../../../../adminData/products.json') ;
import dataGroup from '../../firebase/productData.js';


let _ = require('lodash')

export default class ProductList extends Component{
    constructor(props){
        super();    
           
    }
    render(){

        return <div>
        <NavButton categoryName = {dataGroup}></NavButton>
        <ProdCard productList={dataGroup}></ProdCard>
        </div>
    }
}