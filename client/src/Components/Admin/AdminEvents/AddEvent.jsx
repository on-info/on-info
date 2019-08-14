import React from 'react';
import PropTypes from 'prop-types';
import { addEvents } from '../../../eventsCalls';
import EventForm from './EventsForm';

const AddEvent = ({ showMessage }) => {
  function handleFormSubmit(formData) {
    addEvents(formData)
      .then((data) => {
        showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        showMessage({ type: 'error', text: err.response.data.message });
      });
  }
  return (
    <div className='admin-events'>
      <h1 className='secondary-heading'>Добавление события</h1>
      <EventForm onSubmit={handleFormSubmit} buttonText='Добавить событие' />
    </div>
  );
};

export default AddEvent;

AddEvent.propTypes = {
  showMessage: PropTypes.func.isRequired,
};
