import React, {Component} from 'react';
import EventsAside from '../EventsAside/EventsAside';
import EventsList from '../EventsList/EventsList';
import EventsCalendar from '../EventsCalendar/EventsCalendar'
import './EventsListAndAside.css'
import { server } from "../../api";
import axios from 'axios';
import _ from 'lodash';
import Button from '../Button/Button';
import switchImg from '../../Assets/AssetsSvg/switch-view.svg';

class EventsListAndAside extends Component {
    state = {
        currentSource:'вce',
        calendarPage : false,
    }
    componentDidMount(){
        this.getEventsList();
        this.getFiltersList();
    };
    getCurrentFilter = (str) =>{
        (str ==='все') ? this.filterArray('') : this.filterArray(str);
    };
    getCalendar = () => {
        this.setState({calendarPage : !this.state.calendarPage});
    };
    render() {
        return (
            <div className = 'events-aside-list'>
                <div
                    className = 'calendar-event'
                    onClick = {this.getCalendar}
                >
                    <img src = {switchImg} />
                    <span>{!this.state.calendarPage? 'Календарь' : 'Список'} </span>
                </div>
                {this.state.filters ? 
                    <EventsAside 
                        name = 'events-page-aside'
                        filters = {this.state.filters}
                        getCurrentFilter = {this.getCurrentFilter} 
                        
                    />: 
                    null}
                    {!this.state.calendarPage ?  
                         <EventsList 
                            currentSource = {this.state.currentSource} 
                            name = "events-list" 
                            array = {this.state.filterArray}
                        /> :  
                        <EventsCalendar
                            array = {this.state.filterArray}
                        /> 
                    }
              
            </div>
        ) 
    }
    getEventsList = () => {
        axios({
            url:`${server}/api/events`
        })
        .then(res => {
            this.setState({events: res.data.events }, () => {
                this.filterArray('')
            });
        });
    };
    getFiltersList = () => {  
        axios({
            method: 'get',
            url: `${ server }/api/filters`,
        })
        .then(res =>{
            let filterList = res.data.filterList;
            let filtersEvents = _.filter(filterList , function(el){
                if(el.type === 'events'){
                    return el
                }
            })
            this.setState({
              filters:filtersEvents,
            })
        }) 
    };
    filterArray = (value) =>{
        if(value.length === 0){
            this.setState({filterArray : this.state.events}); 
        }else{
            let filterArray =this.state.events.filter (events => {
                return (events.filter === value)
           })
            this.setState({filterArray : filterArray });
        };
    };
}

export default EventsListAndAside;