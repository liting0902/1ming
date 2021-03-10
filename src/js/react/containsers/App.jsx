import React,{Component} from 'react'
import OrderPage from './OrderPage.jsx'
import OrderInfo from '../components/OrderInfo.jsx'

export default class App extends Component{
    constructor(){
        super();
    }
    render(){
        return <React.Fragment>
            <OrderInfo></OrderInfo>
            {/* <OrderPage></OrderPage> */}
        </React.Fragment>
        
    }
}
