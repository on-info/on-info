import React from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../eventsCalls';
import calendarImage from '../img/calendar.jpg';
import CalendarEvent from '../CalendarEvent/CalendarEvent';
import { countOfCalledEvents } from '../../configs/config.json';
import './CalendarLanding.css';

export default class CalendarLanding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.setEvents = this.setEvents.bind(this);
  }

  componentDidMount() {
    this.setEvents();
  }

  setEvents() {
    getEvents(countOfCalledEvents).then(events => this.setState({ events }));
  }

  render() {
    return (
      <div className='home--calendar'>
        <img src={calendarImage} alt='Последние ивенты' className='calendar--image' />
        <div className='calendar--event-wrapper'>
          <h1 className='calendar--heading'>Ближайшие события</h1>
          <div className='calendar-events'>
            {this.state.events.map(event => (
              <CalendarEvent
                title={event.title}
                description={event.description}
                url={event.url}
                start={event.start}
                end={event.end}
                key={event._id}
                id={event._id}
              />
            ))}
          </div>
          <Link to='/calendar' className='card--link'>
            Все события
          </Link>
        </div>
      </div>
    );
  }
}
