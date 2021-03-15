import React, { Component } from 'react';
import 'bootstrap';
import './navButton.css'

export default class NavButton extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        
        return <div className={'productHeader d-flex justify-content-around'}>
            {this.props.categoryName.map((data, i) => {
                // console.log(data.groupNameZTW) 
                return <a key={i} className={'navBtn '} href={`#${data.groupName}`} >{data.groupNameZTW}</a>
            })}
        </div>
    }
}