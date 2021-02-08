import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux'
// import updateQty from '../actions/updateQty.js';
import CateCard from './CateCard.jsx'
import './prodCard.css';

// import products from '../../../../adminData/products.json';
// let _ = require('lodash')
// import dataGroup from '../../firebase/productData.js';

class ProdCard extends Component {
    constructor(props) {
        super();
        // console.log(props.productList )
        // this.productData = props.productList        

    };
    render() {
        const productGroup = this.props.productList.map((data, i) => {
            return (<div className={'prodCard'}  key={i}>
                <h2 className={'cateName'} id={data.groupName}> {data.groupNameZTW}</h2>
                <div >
                    <CateCard arrGroupItem={data.arrGroupItem}></CateCard>
                </div>
            </div>)
        })

        return <div >
            {productGroup}
        </div>
    }
}
// function mapStateToProps(state){
//     return{
//         productList: state.productList,
//         // updateQty: state.updateQty
//     }
// }
// function mapDispatchToProps(dispatch){
//     return bindActionCreators({
//         updateQty
//     }, dispatch);
// }

// export default connect(mapStateToProps,mapDispatchToProps)(ProdCard);
export default ProdCard;