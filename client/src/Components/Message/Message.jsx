import React from 'react';
import PropTypes from 'prop-types';
import './Message.css';
import { confirmMessageTimer } from '../../configs/config.json';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.hide = this.hide.bind(this);
    this.getClass = this.getClass.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      visible: true,
    });
    clearTimeout(this.timerId);
    this.hide();
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  getClass() {
    const { type } = this.props;
    if (type === 'success' || type === 'error') {
      return `message-${type}`;
    }
    return null;
  }

  hide() {
    this.timerId = setTimeout(() => {
      this.setState({ visible: false });
    }, confirmMessageTimer);
  }

  render() {
    return (
      this.state.visible && <div className={`message ${this.getClass()}`}>{this.props.text}</div>
    );
  }
}

Message.defaultProps = {
  text: '',
  type: '',
};

Message.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};
