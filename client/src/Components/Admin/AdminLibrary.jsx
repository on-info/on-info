import React from 'react';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminLibraryPage from './AdminLibrary/AdminLibraryPage';
import PendingItemsPage from './AdminLibrary/PendingItemsPage';
import CategoriesManagementPage from './AdminLibrary/CategoriesManagementPage';
import './AdminLibrary.css';

const AdminLibrary = ({ match, showMessage }) => (
  <div className='library--admin'>
    <NavLink to={`${match.url}/pending`} className='admin--library-link'>
      Заявки на добавление
    </NavLink>
    <NavLink to={`${match.url}/libraryItems`} className='admin--library-link'>
      Документы библиотеки
    </NavLink>
    <NavLink to={`${match.url}/categoriesManagement`} className='admin--library-link'>
      Управление категориями
    </NavLink>
    <Switch>
      <Route
        path={`${match.url}/pending`}
        render={() => <PendingItemsPage showMessage={showMessage} />}
      />
      <Route
        path={`${match.url}/libraryItems`}
        render={() => <AdminLibraryPage showMessage={showMessage} />}
      />
      <Route
        path={`${match.url}/categoriesManagement`}
        render={() => <CategoriesManagementPage showMessage={showMessage} />}
      />
      <Redirect to={`${match.url}/libraryItems`} />
    </Switch>
  </div>
);

export default withRouter(AdminLibrary);

AdminLibrary.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
