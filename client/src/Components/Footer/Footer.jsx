import React, { Component } from 'react';
import './Footer.css';
import {NavLink} from "react-router-dom";

class Footer extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
			<div className = {this.props.name +' footer'}> 
				<span className = 'copyright'>&#169; </span>
				<NavLink to="/" className = 'link-on-main-page'> on-info</NavLink>
				<span>, {(new Date()).getFullYear()}</span>
		</div>
  	
    );
  }
}

export default Footer;