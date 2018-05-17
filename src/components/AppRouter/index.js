import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import LoginPage from '../LoginPage';
import PrivateRoute from '../PrivateRouter';
import HomePage from '../HomePage';
import TradePage from '../TradePage';

const AppContainer = styled.main`
  background-color: #f5f5f6;
  height: 100vh;
`;

class AppRouter extends Component {
  render () {
    return (
      <AppContainer>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <PrivateRoute path="/trade/:name" component={TradePage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </AppContainer>
    );
  }
}

export default AppRouter;
