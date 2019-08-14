import React from 'react';
import AdminNewsItem from './AdminNewsItem';
import { getNews } from '../../newsCalls';
import cancelablePromise from '../../utils/cancelablePromise';

export default class AdminNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
    };
    this.setNews = this.setNews.bind(this);
  }

  componentDidMount() {
    this.setNews();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setNews() {
    this.cancelablePromise = cancelablePromise(getNews());
    this.cancelablePromise.promise.then(news => this.setState({ news })).catch((err) => {
      window.console.log(err);
    });
  }

  render() {
    return (
      <div>
        <div className='news-admin'>
          <h2 className='secondary-heading'>Список всех новостей</h2>
          <div className='news-list'>
            {this.state.news.map(item => (
              <AdminNewsItem key={item._id} {...item} setNews={this.setNews} {...this.props} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
