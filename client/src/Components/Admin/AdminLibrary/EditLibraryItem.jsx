import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import Form from '../../Library/Form/Form';
import { updateItem, getItemById } from '../../../libraryCalls';
import BackIcon from '../../icons/back.svg';
import './EditLibraryItem.css';

class EditLibraryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryItem: null,
    };
    this.getLibraryItems = this.getLibraryItems.bind(this);
    this.updateLibraryItem = this.updateLibraryItem.bind(this);
  }

  componentDidMount() {
    this.getLibraryItems();
  }

  getLibraryItems() {
    const { id } = this.props.match.params;
    getItemById(id).then((item) => {
      this.setState({ libraryItem: item });
    });
  }

  updateLibraryItem(item) {
    updateItem(this.props.match.params.id, item)
      .then((data) => {
        this.props.showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  render() {
    return (
      <div className='edit-library-item'>
        <img src={BackIcon} alt='иконка' className='edit-library-item--icon move-back-icon' />
        <NavLink
          to='/admin/library/libraryItems'
          className='edit-library-item--link move-back-link'
        >
          Вернуться к списку
        </NavLink>
        <h1 className='secondary-heading'>Редактирование документа</h1>
        <Form
          item={this.state.libraryItem}
          onSubmit={this.updateLibraryItem}
          message='Документ был отредактирован'
          buttonText='Сохранить'
        />
      </div>
    );
  }
}

export default withRouter(EditLibraryItem);

EditLibraryItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
