import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ChangeForgottenPasswordForm from './ChangeForgottenPasswordForm';
import { changeForgottenPassword, isValidToken } from '../../accountCalls';

class ChangeForgottenPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidToken: '',
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    isValidToken(token).then((isValid) => {
      this.setState({ isValidToken: isValid });
    });
  }

  handleFormSubmit(formData) {
    const { token } = this.props.match.params;
    changeForgottenPassword({ ...formData, token })
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  render() {
    return (
      <div className='changePassPage indent'>
        {this.state.isValidToken && (
          <ChangeForgottenPasswordForm buttonText='Отправить' onSubmit={this.handleFormSubmit} />
        )}
        {this.state.isValidToken === '' && <p>Загрузка...</p>}
        {this.state.isValidToken === false && <Redirect to='/login' />}
      </div>
    );
  }
}

export default withRouter(ChangeForgottenPasswordPage);

ChangeForgottenPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }),
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
