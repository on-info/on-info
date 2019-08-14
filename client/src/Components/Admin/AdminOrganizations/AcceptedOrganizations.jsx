import React from 'react';
import { withRouter } from 'react-router-dom';
import { getOrganizations } from '../../../organizationsCalls';
import AcceptedItem from './AcceptedItem';
import cancelablePromise from '../../../utils/cancelablePromise';

class AcceptedOrganizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
    };
    this.setOrganizations = this.setOrganizations.bind(this);
  }

  componentDidMount() {
    this.setOrganizations();
  }

  componentWillUnmount() {
    this.cancelablePromise.cancel();
  }

  setOrganizations() {
    this.cancelablePromise = cancelablePromise(getOrganizations());
    this.cancelablePromise.promise
      .then(organizations => this.setState({ organizations }))
      .catch((err) => {
        window.console.log(err);
      });
  }

  render() {
    return (
      <div className='tabs-box'>
        <h2 className='secondary-heading'>Все организации</h2>
        {this.state.organizations.map(item => (
          <AcceptedItem
            key={item._id}
            {...item}
            setOrganizations={this.setOrganizations}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(AcceptedOrganizations);
