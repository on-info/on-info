import React from 'react';
import PropTypes from 'prop-types';
import { deleteOrganization } from '../../../organizationsCalls';
import Organization from '../../Organizations/Organization';
import ControlButton from '../../ControlButton/ControlButton';
import Modal from '../ModalWindow/ModalWindow';

export default class AcceptedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.rejectOrganization = this.rejectOrganization.bind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  rejectOrganization() {
    deleteOrganization(this.props._id)
      .then((data) => {
        this.props.setOrganizations();
        this.props.showMessage({ type: 'success', text: data.message });
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

AcceptedItem.propTypes = {
  _id: PropTypes.string.isRequired,
  setOrganizations: PropTypes.func.isRequired,
  showMessage: PropTypes.func.isRequired,
};
