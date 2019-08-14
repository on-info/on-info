import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import './CalendarCard.css';

const CalendarCard = ({
  title, description, start, end,
}) => {
  const descriptionClass = classNames({
    'calendar-card--description': description,
    'calendar-card--description-empty': !description,
  });
  return (
    <div className='calendar-card'>
      <div className='calendar-card--content'>
        <h1 className='calendar-card--title'>{title}</h1>
        <p className={descriptionClass}>{description || 'Нет описания'}</p>
        <div className='calendar-card--time-wrapper'>
          <div className='time-wrapper--time-box'>
            <p className='time-box--value'>Когда: {moment(start).format('LL')}</p>
          </div>
          <div className='time-wrapper--time-box'>
            <p className='time-box--value'>Время начала: {moment(start).format('HH:mm')}</p>
            <p className='time-box--value'>Время окончания: {moment(end).format('HH:mm')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarCard;

CalendarCard.defaultProps = {
  description: '',
  title: '',
  start: '',
  end: '',
};

CalendarCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
};
