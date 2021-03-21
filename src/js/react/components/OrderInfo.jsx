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
            text: '訂單成立時間',
            sort: true
        },
        {
            dataField: 'summary',
            text: '總金額',
            sort: true
        }];
        const expandRow = {

            renderer: row => {
                console.log(row)
                let orderDetail = row.orderItem.map((element, i) => {
                    let itemSum = element.price * element.quantity
                    return <tr key={i} className={'orderDetailExpanded'}>
                            <td ><img className={'thumbnailUrl'} src={element.thumbnailUrl} ></img></td>
                            <td>{element.name}</td>
                            <td>{element.quantity}份</td>
                            <td>${itemSum}</td>
                        </tr>
                })
                return <table >
                    <tr className={'orderDetailExpanded tablehead'}>
                        <td >品項</td>
                        <td >名稱</td>
                        <td >數量</td>
                        <td >單項總價</td>
                    </tr>
                        
                    {orderDetail}
                </table>
            },
            showExpandColumn: true,
            expandHeaderColumnRenderer: ({ isAnyExpands }) => {
                if (isAnyExpands) {
                    return <b className="expandedHeaderColor"><i className="fas fa-angle-double-down"></i></b>;
                }
                return <b><i className="fas fa-angle-double-right"></i></b>;
            },
            expandColumnRenderer: ({ expanded }) => {
                if (expanded) {
                    return (
                        <b className="expandedColor"><i className="fas fa-angle-down"></i></b>
                    );
                }
                return (
                    <b><i className="fas fa-angle-right"></i></b>
                );
            }
        };
        const defaultSorted = [{
            dataField: 'name',
            order: 'desc'
        }];
        let bootstrapTable = <BootstrapTable
            keyField='id'
            data={tableData}
            columns={columns}
            expandRow={expandRow}
            defaultSortDirection="asc"
        />


        return <div className="orderInfoMain">
            <div className={'divOrderBtn'}>
            <button className="btnGetAllOrder" onClick={() => { this.showOrderInfo() }}><span>查詢所有訂單</span></button>
            </div>
            
            {bootstrapTable}

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
