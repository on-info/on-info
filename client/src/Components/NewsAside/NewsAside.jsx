import React, {Component} from 'react';
import './NewsAside.css';

class NewsAside extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem : '',
            filters : []
        }
    }
    componentDidMount(){
        this.setState({activeItem : 'Все', filters : this.props.filters});
    }
    getCurrentFilter = (e) => {
        let currentFilter = e.target;
        this.setState({activeItem :e.target.innerText.toLowerCase()}, () => {
            this.props.getCurrentFilter(this.state.activeItem);
        });    
    }
    render() {
        const {activeItem} = this.state;
        return (
            <div className = 'news-aside-wrapper'>
                <div className = "news-aside">
                <ul className = 'link-news' onClick = {this.getCurrentFilter}>
                        {this.state.filters ? this.state.filters.map((el,index) => {
                            if(activeItem === el.title){
                                return <li 
                                          className = 'active-link-news' 
                                          key = {index}>
                                          {el.title}
                                       </li>
                            }                      
                            return <li
                                      key = {index}>
                                      {el.title}
                                   </li>                    
                        
                        }): null}
                    </ul>
                </div>
            </div>
        ) 
    }
}

export default NewsAside;