import React from 'react';
import PropTypes from 'prop-types';
import { acceptPendingOrganizations, deleteOrganization } from '../../../organizationsCalls';
import Organization from '../../Organizations/Organization';
import ControlButton from '../../ControlButton/ControlButton';
import Modal from '../ModalWindow/ModalWindow';
import './PendingItem.css';

export default class PendingItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.acceptOrganization = this.acceptOrganization.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.rejectOrganization = this.rejectOrganization.bind(this);
  }

  acceptOrganization() {
    acceptPendingOrganizations(this.props._id)
      .then((data) => {
        this.props.setPendingItems();
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

  rejectOrganization() {
    deleteOrganization(this.props._id)
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
        this.props.setPendingItems();
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
    this.toggleModal();
  }

  render() {
    return (
      <div className='admin-organizations--organization'>
        <Organization {...this.props} />
        <div className='item--buttons'>
          <ControlButton
            text='Одобрить заявку'
            onButtonClick={this.acceptOrganization}
            className='control-button control-button-secondary control-button-small'
          />
          <ControlButton
            text='Удалить'
            onButtonClick={this.toggleModal}
            className='control-button control-button-warning control-button-small'
          />
          {this.state.isOpen && (
            <Modal onConfirm={this.rejectOrganization} toggle={this.toggleModal} />
          )}
        </div>
      </div>
    );
  }
}

PendingItem.propTypes = {
  setPendingItems: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  contacts: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
