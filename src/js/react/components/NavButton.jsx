import React, { Component } from 'react';
import 'bootstrap';
import '../../../styles/base/base.css'

export default class NavButton extends Component{
    constructor(props){
        super(props);
        
    }

    render(){
        return <div>
            {this.props.categoryName.map((data, i) => {
                console.log(data.groupNameZTW) 
                return <button className={'b-btnGolden'} key={i}><a href={`#${data.groupName}`} >{data.groupNameZTW}</a></button>
            })}
        </div>
    }
}