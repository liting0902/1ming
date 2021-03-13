import React ,{Component} from 'react';
import OrderInfo from '../components/OrderInfo.jsx'

export default class OrderSummary extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return<React.Fragment>
            <OrderInfo></OrderInfo>
        </React.Fragment>
    }
}