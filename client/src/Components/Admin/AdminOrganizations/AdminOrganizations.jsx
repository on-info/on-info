import React from 'react';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import PendingOrganizations from './PendingOrganizations';
import AcceptedOrganizations from './AcceptedOrganizations';

const AdminOrganizations = ({ match, showMessage }) => (
  <div className='library--admin'>
    <NavLink to={`${match.url}/pending`} className='admin--library-link'>
      Заявки на добавление
    </NavLink>
    <NavLink to={`${match.url}/accepted`} className='admin--library-link'>
      Все организации
    </NavLink>
    <Switch>
      <Route
        path={`${match.url}/pending`}
        render={() => <PendingOrganizations showMessage={showMessage} />}
      />
      <Route
        path={`${match.url}/accepted`}
        render={() => <AcceptedOrganizations showMessage={showMessage} />}
      />
      <Redirect to={`${match.url}/pending`} />
    </Switch>
  </div>
);

export default withRouter(AdminOrganizations);

AdminOrganizations.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
