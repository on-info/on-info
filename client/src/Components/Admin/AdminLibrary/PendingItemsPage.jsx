import React from 'react';
import { withRouter } from 'react-router-dom';
import { getPendingItems } from '../../../libraryCalls';
import PendingItem from './PendingItem';
import cancelablePromise from '../../../utils/cancelablePromise';
import './PendingItemsPage.css';

class PendingItemsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingItems: [],
    };
  }

  componentDidMount() {
    this.setCategories();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setCategories() {
    this.cancelablePromise = cancelablePromise(getPendingItems());
    getPendingItems()
      .then(pendingItems => this.setState({ pendingItems }))
      .catch((err) => {
        window.console.log(err);
      });
  }

  render() {
    return (
      <div className='tabs-box'>
        <h2 className='library-items--heading'>Заявки на добавление в библиотеку </h2>
        {this.state.pendingItems.map(item => (
          <PendingItem key={item._id} {...item} {...this.props} />
        ))}
      </div>
    );
  }
}

export default withRouter(PendingItemsPage);
