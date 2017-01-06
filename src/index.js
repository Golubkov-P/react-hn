import React from 'react';
import Router from 'react-router/lib/Router';
import { browserHistory } from 'react-router';
import ReactDOM from 'react-dom';

import routes from './modules';

ReactDOM.render(
  <Router history={browserHistory} routes={routes} />,
  document.querySelector('#app')
);
