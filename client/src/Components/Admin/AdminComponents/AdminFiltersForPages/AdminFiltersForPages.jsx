import React, {Component} from 'react';
import AdminFilter from '../AdminFilter/AdminFilter';
import TextField from '../../../TextField/TextField';
import Button from '../../../Button/Button';
import { server } from '../../../../api';
import axios from 'axios';
import '../AdminFiltersForPages/AdminFiltersForPages.css';

class FiltersForPages extends Component {
    state = {
        type : '',
        filters : [],
        title : '',
        isOpen: false
    }
    componentDidMount(){
        this.props ? 
            this.setState({
                type : this.props.type,
                filters : this.props.list,
        }): null
    };
    addFilter = () => {
        if(this.state.title){        
            this.createFilter();
            this.setState({title: ''});
        }        
    }
    getValue = (str) => {
        this.setState({title: str});    
    };  
    showFilterList = () => {
        this.setState({isOpen: !this.state.isOpen});
    };
    onKeyPress  = (e) => {
        (e.charCode === 13) ? this.addFilter(): null;
    }
    render() {
        return (
            <div className="filters-for-pages">
               <p className = 'filter-title' onClick = {this.showFilterList}> {this.props.title}</p>
               {this.state.isOpen ? 
                 <div>
                    <div className = 'input-button-filters-page'>
                        <TextField
                            onKeyPress = {this.onKeyPress}
                            label = 'Добавить фильтр :'
                            value = {this.state.title}
                            onChangeValue = {this.getValue}
                        />
                        <Button                        
                            clickHandler = {this.addFilter}                        
                            label = 'Добавить'
                        />
                   </div>
                   <div className = 'filters-list'>
                        <ul>
                            {this.state.filters.length? this.state.filters.map( (el, index) => {
                                if(el.title !== 'все'){
                                    return  <AdminFilter
                                                filter = {el.title} 
                                                id = {el._id}
                                                key = {index} 
                                                deleteHandler = {() => this.deleteFilter(el)}
                                            />
                                }                                
                            }                           
                            ): null} 
                        </ul>
                    </div>
                </div> : null}               
            </div>  
        )
    }
    createFilter = () => {
        if(this.state.title.toLowerCase() !== 'все'){
            axios({
                method: 'post',
                url: `${ server }/api/filters`,
                data: this.state,
                config: { headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }},
            })
            .then(res => {
                let arrayFilters = this.state.filters;
                arrayFilters.push(res.data);
                this.setState ({
                    filters: arrayFilters 
                })
            })           
        }        
    };
    deleteFilter = (filter) => {
        let id = filter._id; 
        axios({
            method: 'delete',
            url: `${server}/api/filters/` + id,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.setState({           
                filters : this.state.filters.filter(item => {
                    return item._id !== id
                })
            });
        });
    }
}

export default FiltersForPages;
