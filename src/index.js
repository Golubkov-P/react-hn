import React from 'react';
import { render } from 'react-dom';

import { match, Router, browserHistory } from 'react-router';

import routes from './modules';

const container = document.getElementById('app');

render(
  <Router routes={routes} history={browserHistory} />,
  container
);

