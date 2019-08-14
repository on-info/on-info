import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { loginUser } from '../../Auth/Auth';
import './LoginForm.css';

const LoginPage = ({ showMessage, onAuthChange, history }) => {
  function handleFormSubmit(formData) {
    loginUser(formData)
      .then((userInfo) => {
        onAuthChange(userInfo);
        history.push('/home');
      })
      .catch((err) => {
        showMessage({ type: 'error', text: err.response.data.message });
      });
  }
  return (
    <div className='login indent'>
      <LoginForm buttonText='Вход' onSubmit={handleFormSubmit} />
    </div>
  );
};

export default withRouter(LoginPage);

LoginPage.propTypes = {
  onAuthChange: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
