import React from 'react';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AdminNews from './AdminNews';
import EditNews from './AddEditNews/EditNews';
import AddNews from './AddEditNews/AddNews';
import AddEvent from './AdminEvents/AddEvent';
import AdminLibrary from './AdminLibrary';
import AdminOrganizations from './AdminOrganizations/AdminOrganizations';
import '../Sidebar/Sidebar.css';

const Admin = ({ match, userInfo, showMessage }) => (
  <div className='admin indent'>
    {userInfo.admin && (
      <div className='sidebar'>
        <div className='sidebar--navigation'>
          <NavLink to={`${match.url}/news`} className='sidebar--link'>
            Посмотреть все новости
          </NavLink>
          <NavLink to={`${match.url}/addNews`} className='sidebar--link'>
            Добавить новость
          </NavLink>
          <NavLink to={`${match.url}/calendar`} className='sidebar--link'>
            Добавить событие
          </NavLink>
          <NavLink to={`${match.url}/library`} className='sidebar--link'>
            Библиотека
          </NavLink>
          <NavLink to={`${match.url}/organizations/`} className='sidebar--link'>
            Организации
          </NavLink>
        </div>
        <Switch>
          <Route
            path={`${match.url}/news/edit/:id`}
            render={() => <EditNews showMessage={showMessage} />}
          />
          <Route
            exact
            path={`${match.url}/news`}
            render={() => <AdminNews showMessage={showMessage} />}
          />
          <Route
            path={`${match.url}/addNews`}
            render={() => <AddNews showMessage={showMessage} />}
          />
          <Route
            path={`${match.url}/calendar`}
            render={() => <AddEvent showMessage={showMessage} />}
          />
          <Route
            path={`${match.url}/library`}
            render={() => <AdminLibrary showMessage={showMessage} />}
          />
          <Route
            path={`${match.url}/organizations`}
            render={() => <AdminOrganizations showMessage={showMessage} />}
          />
          <Redirect to={`${match.url}/news`} />
        </Switch>
      </div>
    )}
    {userInfo.admin === false && <Redirect to='/login' />}
    {userInfo.admin === undefined && <p>Загрузка...</p>}
  </div>
);

export default withRouter(Admin);

Admin.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    admin: PropTypes.bool,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
