import React from 'react';
import PropTypes from 'prop-types';
import CalendarCard from '../CalendarCard/CalendarCard';
import { getEventById } from '../../eventsCalls';

export default class CalendarEventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getEventById(id).then((event) => {
      this.setState({ event });
    });
  }

  render() {
    return (
      <div className='calendar-event-page'>
        <CalendarCard {...this.state.event} />
      </div>
    );
  }
}

CalendarEventPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
