import React, {Component} from 'react';
import NewsAside from '../NewsAside/NewsAside';
import NewsList from '../NewsList/NewsList';
import '../NewsListAndAside/NewsListAndAside.css';

class NewsListAndAside extends Component {
    state = {
        filterArray:this.props.array
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.array!=this.props.array){
            this.setState({filterArray:nextprops.array});
        }
    }
    getCurrentFilter = (str) => {
        this.props.getNewFilter(str);       
    }

    render() {
        return (
            <div className = 'aside-and-menu'>
            {this.props.filters? 
                <NewsAside
                    getCurrentFilter= {this.getCurrentFilter} 
                    filters = {this.props.filters}/>: null}                
                <NewsList 
                    currentSource = {this.state.currentSource} 
                    name = "news-list" 
                    array = {this.state.filterArray} 
                />
            </div>
        ) 
    }
}

export default NewsListAndAside;