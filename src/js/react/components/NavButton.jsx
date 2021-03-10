import React, { Component } from 'react';
import 'bootstrap';
import './navButton.css'

export default class NavButton extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        
        return <div className={'productHeader d-lg-flex justify-content-around d-none'}>
            {this.props.categoryName.map((data, i) => {
                // console.log(data.groupNameZTW) 
                return <div className={'navBtn '} key={i}><a href={`#${data.groupName}`} >{data.groupNameZTW}</a></div>
            })}
        </div>
    }
}