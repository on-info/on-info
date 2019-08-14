import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AddCategoryPage from './AddCategoryPage';
import CategoriesManagement from './CategoriesManagement';

const CategoriesManagementPage = ({ match, showMessage }) => (
  <div className='tabs-box'>
    <h2 className='library-items--heading'>Управление категориями</h2>
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => <CategoriesManagement showMessage={showMessage} />}
      />
      <Route
        path={`${match.url}/addCategory`}
        render={() => <AddCategoryPage showMessage={showMessage} />}
      />
      <Redirect to={`${match.url}`} />
    </Switch>
  </div>
);

export default withRouter(CategoriesManagementPage);

CategoriesManagementPage.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
