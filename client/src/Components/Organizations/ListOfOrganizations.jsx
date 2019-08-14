import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOrganizations } from '../../organizationsCalls';
import Organization from './Organization';
import './ListOfOrganizations.css';

class ListOfOrganizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
    };
  }

  componentDidMount() {
    this.setOrganizations();
  }

  setOrganizations() {
    getOrganizations().then(organizations => this.setState({ organizations }));
  }

  render() {
    return (
      <div className='list-of-organizations'>
        <h1 className='list-of-organizations--heading secondary-heading'>
          Справочник организаций занимающихся вопросами людей с особыми потребностями
        </h1>
        <div className='list-of-organizations--items'>
          <Link
            to={`${this.props.match.url}/${this.props.userInfo.name ? 'addOrganization' : 'login'}`}
            className='control-button control-button-tertiary control-button-small'
          >
            Добавить организацию
          </Link>
          {this.state.organizations.map(item => Organization(item))}
        </div>
      </div>
    );
  }
}

export default withRouter(ListOfOrganizations);

ListOfOrganizations.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({ name: PropTypes.string }).isRequired,
};
