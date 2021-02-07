import React ,{Component} from 'react'
import ProdCard from '../components/ProdCard.jsx';
// let products = require('../../../../adminData/products.json') ;
import dataGroup from '../../firebase/productData.js';

let _ = require('lodash')

export default class ProductList extends Component{
    constructor(props){
        super();        
    }
    render(){

        return <div>
        {/* <ProdCard data={dataGroup}></ProdCard> */}
        </div>
    }
}