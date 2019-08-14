import React, {Component} from 'react';
import Button from '../../../Button/Button';

import moment from 'moment';
import './AdminEvent.css';

class AdminEvent extends Component {
    state = {
        eventInfo :false
    }
   render() {
       return (
           <div className="event-admin"  id = {this.props.event._id} >
               <div onClick = {this.props.clickHandler} className = 'event-name'>{this.props.event.title}</div>
               <div>{moment(this.props.event.date).format('DD-MM-YYYY')}</div>
               <div>
                   <Button
                       name = "button-admin admin-cancel"
                       label = {<span aria-hidden="true">&times;</span>}
                       clickHandler = {this.props.deleteHandler}
                   />
               </div>
           </div>
       )
   }
}

export default AdminEvent;