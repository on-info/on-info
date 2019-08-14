import React, {Component} from 'react';
import './EventsAside.css';

class NewsAside extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem : '',
            filters : []
        }
    }
    componentDidMount(){
        this.setState({activeItem : 'все', filters:this.props.filters});
    };
    getCurrentFilter = (e) => {
        let currentFilter = e.target;
        this.setState({activeItem :e.target.innerText.toLowerCase()}, () => {
            this.props.getCurrentFilter(this.state.activeItem);
        });    
    };
    render() {
        const {activeItem,filters} = this.state;
        return (
            <div className="events-aside " >
                <ul className = {'link-news ' +this.props.name} onClick = {this. getCurrentFilter}>
                    {this.props.filters.map((el,index)=> {
                        if(activeItem === el.title){
                            return <li className ='active-link-news' key = {index}>{el.title}</li>
                        }                      
                        return <li key = {index}>{el.title}</li>                  
                    })}
                </ul>
            </div>
        ) 
    }
}

export default NewsAside;