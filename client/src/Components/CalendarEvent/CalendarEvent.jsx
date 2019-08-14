import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shortenText from '../../utils/ShortenText';
import './CalendarEvent.css';

const CalendarEvent = ({
  id, title, description, url, start, end,
}) => (
  <div className='calendar-event'>
    <h2 className='calendar-event--title'>{title}</h2>
    <p className='calendar-event--description'>{shortenText(description)}</p>
    <div className='calendar-event--time-wrapper'>
      <div className='time-box'>
        <p className='time-box--value'>Когда: {moment(start).format('LL')}</p>
      </div>
      <div className='time-box'>
        <p className='time-box--value'>Время начала: {moment(start).format('HH:mm')}</p>
        <p className='time-box--value'>Время окончания: {moment(end).format('HH:mm')}</p>
      </div>
    </div>
    <Link
      to={url || `calendar/${id}`}
      className='calendar-event--link'
      rel='noopener noreferrer'
      target={url ? '_blank' : ''}
    >
      подробнее
    </Link>
  </div>
);

export default CalendarEvent;

CalendarEvent.defaultProps = {
  description: 'Для этого события нет описания',
  url: '',
};

CalendarEvent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};
