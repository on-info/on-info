import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditLibraryItem from './EditLibraryItem';
import AdminLibraryList from './AdminLibraryList';
import CategoriesListPage from './CategoriesListPage';

const AdminLibraryPage = ({ match, showMessage }) => (
  <div className='tabs-box'>
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => <CategoriesListPage showMessage={showMessage} />}
      />
      <Route
        path={`${match.url}/:category/:type/edit/:id`}
        render={() => <EditLibraryItem showMessage={showMessage} />}
      />
      <Route
        path={`${match.url}/:category/:type`}
        render={() => <AdminLibraryList showMessage={showMessage} />}
      />
    </Switch>
  </div>
);

export default withRouter(AdminLibraryPage);

AdminLibraryPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
