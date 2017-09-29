import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from './routes/Users';

function RouterConfig({ history }) {
  const routes = [{
    path: '/',
    component: IndexPage,
  },
  {
    path: '/users',
    component: Users,
  }];
  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
