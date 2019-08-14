import React, {Component} from 'react';
import TextField from '../../../TextField/TextField';
import './AdminProjectsSearch.css';
import searchImg from '../../../../../src/Assets/AssetsSvg/Search.svg';

class AdminProjectsSearch extends Component {
    render() {
        return (
            <div className="search-projects">
                <img src={searchImg} alt="" />
                <TextField 
                    type="search" 
                    nameClass="admin-search-input" 
                    onChangeValue={this.onSearch} 
                    placeholder="Поиск" 
                />
            </div>
        )
    }
    onSearch = (str) => {
        this.props.findProjects(str.toLowerCase());
    }
}

export default AdminProjectsSearch;