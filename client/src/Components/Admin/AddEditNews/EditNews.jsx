import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Form from '../Form/Form';
import { updateNews, getNewsById } from '../../../newsCalls';
import './AddEditNews.css';

class EditNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsToEdit: null,
    };
    this.handleNewsUpdate = this.handleNewsUpdate.bind(this);
  }

  componentDidMount() {
    this.getNews();
  }

  getNews() {
    const { id } = this.props.match.params;
    getNewsById(id).then((news) => {
      this.setState({ newsToEdit: news });
    });
  }

  handleNewsUpdate(news) {
    updateNews(this.props.match.params.id, news)
      .then((data) => {
        this.setState({ newsToEdit: news });
        this.props.showMessage({ type: 'success', text: data.message });
      })
      .catch((err) => {
        this.props.showMessage({ type: 'error', text: err.response.data.message });
      });
  }

  render() {
    return (
      <div className='admin-form-news'>
        <h1 className='secondary-heading'>Редактирование новости</h1>
        <Form
          news={this.state.newsToEdit}
          onSubmit={this.handleNewsUpdate}
          buttonText='Сохранить новость'
        />
      </div>
    );
  }
}

export default withRouter(EditNews);

EditNews.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
