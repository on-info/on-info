import React from 'react';
import PropTypes from 'prop-types';
import ChangePasswordForm from './ChangePasswordForm';
import { changePassword } from '../../accountCalls';
import './ChangePasswordPage.css';

const ChangePasswordPage = ({ showMessage }) => {
  function handleFormSubmit(formData) {
    changePassword(formData)
      .then((data) => {
        showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        showMessage({ type: 'error', text: err.response.data.message });
      });
  }
  return (
    <div className='changePasswordPage'>
      <ChangePasswordForm buttonText='Отправить' onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ChangePasswordPage;

ChangePasswordPage.propTypes = {
  showMessage: PropTypes.func.isRequired,
};
