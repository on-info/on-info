import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, NavLink, Redirect, withRouter } from 'react-router-dom';
import EducationRoute from '../EducationRoute/EducationRoute';
import EducationRouteSearch from '../EducationRouteSearch/EducationRouteSearch';
import ChangePasswordPage from '../ChangePasswordPage/ChangePasswordPage';
import CompletedEducationRouteForm from '../CompletedEducationRouteForm/CompletedEducationRouteForm';

const UserAccount = ({ userInfo, match, showMessage }) => (
  <div className='account indent'>
    {userInfo.name && (
      <div className='sidebar'>
        <div className='sidebar--navigation'>
          <p className='sidebar--header'>Образовательный маршрут:</p>
          <NavLink to={`${match.url}/education-route-add-form`} className='sidebar--link'>
            Заполнить новую карту
          </NavLink>
          <NavLink to={`${match.url}/education-route-users-form`} className='sidebar--link'>
            Просмотр заполненных карт
          </NavLink>
          <NavLink to={`${match.url}/education-route-search`} className='sidebar--link'>
            поиск участников
          </NavLink>
          <NavLink to={`${match.url}/change-password`} className='sidebar--link'>
            Сменить пароль
          </NavLink>
        </div>
        <Switch>
          <Route
            path={`${match.url}/education-route-add-form`}
            render={() => <EducationRoute {...userInfo} showMessage={showMessage} />}
          />
          <Route
            path={`${match.url}/education-route-users-form`}
            render={() => <CompletedEducationRouteForm {...userInfo} showMessage={showMessage} />}
          />
          <Route path={`${match.url}/education-route-search`} component={EducationRouteSearch} />
          <Route
            path={`${match.url}/change-password`}
            render={() => <ChangePasswordPage showMessage={showMessage} />}
          />
        </Switch>
      </div>
    )}
    {userInfo.name === '' && <Redirect to='/login' />}
    {userInfo.name === undefined && <p>Загрузка...</p>}
  </div>
);

export default withRouter(UserAccount);

UserAccount.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string,
    admin: PropTypes.bool,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  showMessage: PropTypes.func.isRequired,
};
