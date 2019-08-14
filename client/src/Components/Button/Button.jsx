import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render() {
        return ( 
            <button 
                className = {this.props.name}
                onClick = {this.props.clickHandler} 
                disabled = {this.props.disabled}>
                {this.props.label} 
            </button> 
        );
    }
}

export default Button;