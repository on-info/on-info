import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SmallCalendar from 'react-calendar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { getEvents } from '../../eventsCalls';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

require('../../../node_modules/moment/locale/ru');

class Calendar extends Component {
  static setDayOfEvent(events) {
    const tagsTime = window.document.querySelectorAll('time[datetime]');
    const allDate = [];
    const eventDate = [];
    tagsTime.forEach((day) => {
      allDate.push(day.dateTime.substring(0, 10));
    });
    events.forEach((event) => {
      eventDate.push(moment(event.start)
        .format('YYYY-MM-DD')
        .substring(0, 10));
    });
    allDate.forEach((dateOfDay) => {
      eventDate.forEach((dateOfEvent) => {
        if (dateOfDay === dateOfEvent) {
          tagsTime.forEach((day) => {
            if (day.dateTime.substring(0, 10) === dateOfDay) {
              day.classList.add('event-day');
            }
          });
        }
      });
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      events: [],
    };
    BigCalendar.momentLocalizer(moment);
    this.onChange = this.onChange.bind(this);
    this.onActiveDateChange = this.onActiveDateChange.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  componentDidMount() {
    window.document.querySelector('.rbc-label').innerText = 'Весь день';
    this.getEvents();
  }

  onChange(date) {
    this.setState({ date });
    Calendar.setDayOfEvent(this.state.events);
  }

  onActiveDateChange() {
    Calendar.setDayOfEvent(this.state.events);
  }

  onEventClick(event) {
    this.props.history.push(`${this.props.match.url}/${event._id}`);
  }

  getEvents() {
    getEvents().then((events) => {
      events.forEach((event) => {
        event.start = new Date(event.start); // eslint-disable-line
        event.end = new Date(event.end); // eslint-disable-line
      });
      Calendar.setDayOfEvent(events);
      this.setState({
        events,
      });
    });
  }

  render() {
    const formats = {
      dayFormat: 'LL',
    };
    return (
      <div className='calendar-wrapper'>
        <SmallCalendar
          minDetail='month'
          onChange={this.onChange}
          value={this.state.date}
          showNeighboringMonth={false}
          showNavigation
          onActiveDateChange={this.onActiveDateChange}
        />
        <div className='calendar--schedule'>
          <BigCalendar
            allDayAccessor='allDay'
            titleAccessor='title'
            startAccessor='start'
            endAccessor='end'
            formats={formats}
            date={this.state.date}
            onNavigate
            toolbar={false}
            views={['day']}
            defaultView='day'
            showMultiDayTimes
            events={this.state.events}
            step={60}
            timeslots={1}
            min={
              new Date(
                this.state.date.getFullYear(),
                this.state.date.getMonth(),
                this.state.date.getDate(),
                8,
              )
            }
            max={
              new Date(
                this.state.date.getFullYear(),
                this.state.date.getMonth(),
                this.state.date.getDate(),
                22,
              )
            }
            onSelectEvent={event => this.onEventClick(event)}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;

Calendar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
