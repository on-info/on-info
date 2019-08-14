import React, {Component} from 'react';
import Select, {Option, OptGroup} from 'rc-select';
import 'rc-select/assets/index.css';
import _ from 'lodash';
import '../AdminSelectSearch/AdminSelectSearch.css';
import TextField from '../../../TextField/TextField';
import Button from '../../../Button/Button';
import {server} from '../../../../api';
import axios from 'axios'

class AdminSelectSearch extends Component {
    state = {
        filters : this.props.filtersList,
        addNewOption : false,
        value : ''
    }
    componentDidMount(){
        (this.props.value) ? this.setState({value:this.props.value}) : this.setState({value:'все'});
        this.createOptions();
    }
    createOptions = () => {
        let array = [];
        if(this.state.filters){
            this.state.filters.forEach(function(item, index){
                let filter = {};
                filter.label= item.title;
                filter.value = index;
                array.push(filter);
            })
        }
        this.setState({filters:array});
    }
    onChange = (value) => {
        (value) ? this.setState ({value : value } ,() => {
            this.props.getFilter(this.state.value);
        }) : null;        
    }
    render() {
        const { selectedOption, addNewOption } = this.state;
        return (
            <div className = "select-component" onChange = {this.getOptions}>
                <div className = "select-filter">
                    <span className = "source-select"> Источник :</span>
                    <Select                   
                        id = "my-select"
                        value = {this.state.value}
                        dropdownMenuStyle = {{ maxHeight: 250 }}
                        onChange = {this.onChange}
                        notFoundContent = 'Ничего не найдено'
                    >
                    {this.state.filters.map((filter,index) => {
                        if(filter.label != 'все'){
                            return <Option 
                                        key = {index} 
                                        value = {filter.label}>
                                        {filter.label}
                                    </Option>
                        }
                    })}
                    </Select>
                </div>
                {addNewOption ? <div className = 'input-buttom-select' >
                    <TextField
                            onKeyPress = {this.onKeyPress}
                            label = 'Добавить фильтр :'
                            value = {this.state.newFilterValue}
                            onChangeValue = {this.getNewValue}
                    />
                    <Button   
                            name = 'select-button'                     
                            clickHandler = {this.addNewFilter}                        
                            label = 'Добавить'
                    />
                </div> : null}       
            </div>
        )
    }

    getOptions = (e) => {
        let value = e.target.value;
        let addNewOption = _.filter(this.state.filters, function(o) { 
        return o.label.includes(value)});   
        (!addNewOption.length) ? this.setState({addNewOption : true}) : null;
        (!e.target.value.length) ? this.setState({addNewOption : false}) : null;
    }

    getNewValue = (str) => {
        this.setState({newFilterValue : str});
    }

    addNewFilter = (e) => {
        e.preventDefault();
        axios({
            url:`${ server }/api/filters`,
            method:'post',
            data:{
                title:this.state.newFilterValue, type:'news'
            },
            config:{
                'Content-Type': 'application/json'
            }
        })
        this.setState({newFilterValue: '', value: this.state.newFilterValue });
        let arrayFilter = this.state.filters;
        let lengthArray = arrayFilter.length;
        let lastValue = arrayFilter[lengthArray-1].value;
        let newFilter = this.state.newFilterValue;
        arrayFilter.push({label:newFilter, value: lastValue ++});          
        this.setState({filters: arrayFilter, addNewOption:false});
    }
}

export default AdminSelectSearch;