import React from 'react';
import { withRouter } from 'react-router-dom';
import CategoriesList from '../../Library/CategoriesList/CategoriesList';

const CategoriesListPage = props => (
  <div className='categories-list-page'>
    <CategoriesList {...props} />
  </div>
);

export default withRouter(CategoriesListPage);
