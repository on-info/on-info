import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';
import { addNews } from '../../../newsCalls';
import './AddEditNews.css';

const AddNews = ({ showMessage }) => {
  function handleFormSubmit(formData) {
    addNews(formData)
      .then((data) => {
        showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        showMessage({ type: 'error', text: err.response.data.message });
      });
  }
  return (
    <div className='admin-form-news'>
      <h1 className='secondary-heading'>Добавление новости</h1>
      <Form onSubmit={handleFormSubmit} buttonText='Добавить новость' />
    </div>
  );
};

export default AddNews;

AddNews.propTypes = {
  showMessage: PropTypes.func.isRequired,
};
