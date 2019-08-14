import React from 'react';
import PropTypes from 'prop-types';
import { acceptPendingItems, deleteLibraryItems } from '../../../libraryCalls';
import ControlButton from '../../ControlButton/ControlButton';
import Modal from '../ModalWindow/ModalWindow';
import './PendingItem.css';

class PendingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.acceptItem = this.acceptItem.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.rejectItem = this.rejectItem.bind(this);
  }

  acceptItem() {
    acceptPendingItems(this.props._id)
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  rejectItem() {
    deleteLibraryItems(this.props._id)
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
    this.toggleModal();
  }

  render() {
    return (
      <div className='library-items--single-item'>
        <a href={this.props.url} className='single-item--link'>
          <h2>{this.props.title}</h2>
        </a>
        <p className='single-item--text'>{this.props.description}</p>
        <div className='item--buttons'>
          <ControlButton
            text='Одобрить заявку'
            onButtonClick={this.acceptItem}
            className='control-button control-button-secondary control-button-small'
          />
          <ControlButton
            text='Удалить'
            onButtonClick={this.toggleModal}
            className='control-button control-button-warning control-button-small'
          />
          {this.state.isOpen && <Modal onConfirm={this.rejectItem} toggle={this.toggleModal} />}
        </div>
      </div>
    );
  }
}

export default PendingItem;

PendingItem.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showMessage: PropTypes.func.isRequired,
};
