import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './App';
import TopPage from './Pages/TopPage';
import NewPage from './Pages/NewPage';
import AskPage from './Pages/AskPage';
import JobPage from './Pages/JobPage';
import ShowPage from './Pages/ShowPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={TopPage} />
    <Route path='newest' component={NewPage} />
    <Route path='ask' component={AskPage} />
    <Route path='job' component={JobPage} />
    <Route path='show' component={ShowPage} />
  </Route>
);
