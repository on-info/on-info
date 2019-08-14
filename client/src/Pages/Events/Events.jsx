import React, { Component } from 'react';
import Menu from '../../Components/Menu/Menu';
import Footer from '../../Components/Footer/Footer';
import '../../Components/Menu/Menu.css';
import './Events.css'
import EventsListAnsAside from '../../Components/EventsListAndAside/EventsListAndAside'
class Events extends Component {
  state = {
    events: {}
  }
  render() {
    return (
      <div className = 'events-container'> 
        <Menu name = 'events-menu'/>
        <EventsListAnsAside />
        <Footer name = 'footer footer-events'/>
    </div>
    );
  }

}

export default Events;