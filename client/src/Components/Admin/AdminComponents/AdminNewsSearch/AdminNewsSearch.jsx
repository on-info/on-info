import React, {Component} from 'react';
import TextField from '../../../TextField/TextField';
import './AdminNewsSearch.css';
import searchImg from '../../../../../src/Assets/AssetsSvg/Search.svg';

class AdminNewsSearch extends Component {
    render() {
        return (
            <div key="news-search" className = 'search-news'>
                <img src = {searchImg} alt = '' />
                <TextField 
                    type = 'search'
                    nameClass = 'admin-search-input' 
                    onChangeValue = {this.onSearch} 
                    placeholder = 'Поиск'
                />
            </div>
        )
    }
    onSearch = (str) => {
        this.props.findNews(str.toLowerCase());
    }


}

export default AdminNewsSearch;