import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Calendar from '../Calendar/Calendar';
import CalendarEventPage from '../CalendarEventPage/CalendarEventPage';

const CalendarPage = ({ match }) => (
  <div className='calendar-page indent'>
    <h1 className='primary-heading'>Календарь событий</h1>
    <Switch>
      <Route exact path={`${match.url}`} component={Calendar} />
      <Route path={`${match.url}/:id`} component={CalendarEventPage} />
      <Redirect to={`${match.url}`} />
    </Switch>
  </div>
);

export default CalendarPage;

CalendarPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};
