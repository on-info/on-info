import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignupForm from './SignupForm';
import { signupUser } from '../../Auth/Auth';
import './SignupForm.css';

const SignupPage = ({ showMessage, onAuthChange }) => {
  function handleFormSubmit(formData) {
    signupUser(formData)
      .then((data) => {
        showMessage({ type: 'success', text: data.message });
        onAuthChange(data.userInfo);
        this.redirect();
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }
  return (
    <div className='indent'>
      <SignupForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default withRouter(SignupPage);

SignupPage.propTypes = {
  onAuthChange: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
};
