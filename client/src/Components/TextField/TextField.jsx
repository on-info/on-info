import React, { Component } from 'react';
import './TextField.css';
import Error from "../ErrorEmail/ErrorEmail";
import '../ErrorEmail/ErrorEmail.css';

class TextField extends Component {
	state = {
		value:'',
		start: 0,
		end:0
	}
	valueChange = (e) => {
		let nextValue = e.target.value;
		this.setState({
		  value: nextValue,
		  start: this.ref.selectionStart ,
		  end: this.ref.selectionEnd,
		}, () =>{
			this.props.onChangeValue(this.state.value); 
		})
	};
	componentDidMount() {
		this.ref.focus();
	};
	componentDidUpdate(prevProps, prevState) {
		if (this.state.value === prevState.value) {
		  this.ref.setSelectionRange(this.state.start, this.state.end)
		}
	};
    render() {
    	return(
 			<div className = 'container-for-input'> 
				{this.props.label ? <label htmlFor = {this.props.id}> {this.props.label} </label> : null}
				<input
					onKeyPress = {this.props.onKeyPress}
					value = {this.props.value}
					type = {this.props.type} 
					className = {this.props.nameClass} 
					id = {this.props.id}  
					name = {this.props.name} 
					placeholder = {this.props.placeholder} 
					onChange = {this.valueChange}
					ref={ref => {
						this.ref = ref
					}}
				/>
			</div>
		)
	}
}

export default TextField;