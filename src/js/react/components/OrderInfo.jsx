import React, { Component } from 'react';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { bindActionCreators } from 'redux';
import getOrderInfo from '../actions/getOrderInfo';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import paginationFactory from 'react-bootstrap-table2-paginator';
import './orderInfo.css'

class OrderInfo extends Component {
    constructor(props) {
        super(props);
        console.log('in constructor ', props.orderInfo)
    }
    showOrderInfo() {
        this.props.getOrderInfo(uid)
    }

    render() {
        let tableData = this.props.orderInfo

        const columns = [{
            dataField: 'orderID',
            text: '訂單編號'
        },
        {
            dataField: 'date',
            text: '訂單成立時間'
        },
        {
            dataField: 'summary',
            text: '總金額'
        }];
        const expandRow = {

            renderer: row => {
                console.log(row)
                let orderDetail = row.orderItem.map((element) => {
                    return <h5>{element.name} -- 數量:{element.quantity} -- 單價:{element.price}</h5>
                })
                return <div>
                    {orderDetail}
                </div>
            },
            showExpandColumn: true,
            expandHeaderColumnRenderer: ({ isAnyExpands }) => {
                if (isAnyExpands) {
                    return <b>-</b>;
                }
                return <b>+</b>;
            },
            expandColumnRenderer: ({ expanded }) => {
                if (expanded) {
                    return (
                        <b>-</b>
                    );
                }
                return (
                    <b>...</b>
                );
            }
        };
        let btTable = <BootstrapTable
            keyField='id'
            data={tableData}
            columns={columns}
            expandRow={expandRow}
        />


        return <div className="orderInfoMain">
            <button onClick={() => { this.showOrderInfo() }}><h1>所有訂單</h1></button>
            {btTable}

        </div>
    }

}
function mapStateToProps(state) {
    return {
        orderInfo: state.getOrderInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getOrderInfo
        }, dispatch
    )

}
export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo)
