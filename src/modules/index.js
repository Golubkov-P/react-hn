import React from 'react';

import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import App from './App';
import TopPage from './Pages/TopPage';
import NewPage from './Pages/NewPage';
import AskPage from './Pages/AskPage';
import JobPage from './Pages/JobPage';
import ShowPage from './Pages/ShowPage';
import UserPage from './Pages/UserPage';
import ItemPage from './Pages/ItemPage';
import Page404 from './Pages/Page404';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={TopPage} />
    <Route path='newest' component={NewPage} />
    <Route path='ask' component={AskPage} />
    <Route path='job' component={JobPage} />
    <Route path='show' component={ShowPage} />
    <Route path='user/:itemId' component={UserPage} />
    <Route path='item/:itemId' component={ItemPage} />

    <Route path='*' component={Page404} />
  </Route>
);
