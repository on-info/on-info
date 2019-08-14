import React from 'react';
import PropTypes from 'prop-types';
import RestorePasswordForm from './RestorePasswordForm';
import { restorePassword } from '../../accountCalls';

const RestorePasswordPage = ({ showMessage }) => {
  function handleFormSubmit(email) {
    restorePassword(email)
      .then((data) => {
        showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        showMessage({ type: 'error', text: err.response.data.message });
      });
  }
  return (
    <div className='indent'>
      <RestorePasswordForm buttonText='Отправить' onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RestorePasswordPage;

RestorePasswordPage.propTypes = {
  showMessage: PropTypes.func.isRequired,
};
