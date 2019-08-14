import React, {Component} from 'react';
import AdminEvent from '../AdminEvent/AdminEvent';
import './AdminEventsList.css';
import AdminCreateEvent from '../AdminCreateEvent/AdminCreateEvent';
import { server } from '../../../../api';
import {withRouter} from "react-router-dom";
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

class AdminEventsList extends Component {
    state = {    
        events : this.props.events
    };
    render() {
        return (
            <div className="events-list-admin">
                <div className="events-list-header">
                    <div>Название события</div>
                    <div>Дата проведения</div>
                    <div>Удалить событие</div>   
                </div>            
                <div>                    
                    {this.state.events.map(event => 
                        <AdminEvent 
                            clickHandler = {() => this.getEventInfo(event) }
                            event = {event} 
                            key = {event._id} 
                            deleteHandler = {() => this.deleteEvent(event)} 
                        />                        
                    )}
                </div>  
            </div>  
        )
    }
    deleteEvent = (event) => {
        axios({
            method: 'delete',
            url: `${server}/api/events`,
            data: event,
            config: { headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }}
        })
        .then((result) => {
            this.setState({            
                events : this.state.events.filter(item => item._id !== result.data.news._id)
            }) 
        })
        this.deletePostVK(event);
      };
    deletePostVK = (event) => {
        let token = '37ad70cb0eaf87ba4a7c79f6ade8668740959edbe1f09250664e6ac748ea496a5a305b8efad4cfe29b679';
        let id = '-169499477';
        axios({
            method: 'delete',
            adapter: jsonpAdapter,
            url: `https://api.vk.com/method/wall.delete?owner_id=${id}&post_id=${event.idVK}&access_token=${token}&v=5.80`            
        })
      };
    getEventInfo = (event) => {
        let id = event._id
        axios({
            url:`${ server }/api/events/${id}`,
            method:'get'
        })
        .then(res => {
            this.setState({ eventInfo: res.data });
            this.props.history.push({
                pathname: '/admin-panel/events/create',
                state: { detail: this.state.eventInfo}
            })
        })        
    }
    }
export default withRouter(AdminEventsList);