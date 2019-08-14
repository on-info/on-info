import React from 'react';
import PropTypes from 'prop-types';
import { getEducation, deleteEducation, updateEducation } from '../../educationCalls';
import EducationRouteCard from './EducationRouteCard/EducationRouteCard';
import cancelablePromise from '../../utils/cancelablePromise';
import './CompletedEducationRouteForm.css';

export default class CompletedEducationRouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usersCards: [],
    };
    this.onEducationRouteCardDelete = this.onEducationRouteCardDelete.bind(this);
    this.onEducationRouteCardEdit = this.onEducationRouteCardEdit.bind(this);
  }

  componentDidMount() {
    this.getEducationByUserId();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  onEducationRouteCardEdit(id, educationToEdit) {
    updateEducation(id, educationToEdit)
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
        this.getEducationByUserId();
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  onEducationRouteCardDelete(id) {
    deleteEducation(id)
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
        this.getEducationByUserId();
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  getEducationByUserId() {
    this.cancelablePromise = cancelablePromise(getEducation(this.props.userId));
    this.cancelablePromise.promise.then(usersCards => this.setState({ usersCards }))
      .catch((err) => {
        window.console.log(err);
      });
  }

  render() {
    return (
      <div className='education-route'>
        <h2 className='secondary-heading'>Заполненные карты</h2>
        <div className='education-route--user-cards'>
          {this.state.usersCards.map((item, index) => (
            <EducationRouteCard
              index={index + 1}
              key={item._id}
              onDelete={this.onEducationRouteCardDelete}
              onEdit={this.onEducationRouteCardEdit}
              {...item}
            />
          ))}
        </div>
      </div>
    );
  }
}

CompletedEducationRouteForm.propTypes = {
  userId: PropTypes.string.isRequired,
  showMessage: PropTypes.func.isRequired,
};
