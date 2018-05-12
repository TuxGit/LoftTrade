import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import LoginPage from '../LoginPage';
// import PrivateRoute from '../PrivateRouter';
// import UserPage from '../UserPage';
// import HomePage from '../HomePage';
// import Header from '../Header';

const AppContainer = styled.main`
  background-color: #f5f5f6;
  height: 100vh;
`;

class AppRouter extends Component {
  render () {
    return (
      <AppContainer>
        {/* <Header/> */}
        <Switch>
          {/* <Route path="/" exact component={HomePage} /> */}
          {/* <PrivateRoute path="/users/:login" component={UserPage} /> */}
          <Route path="/login" component={LoginPage} />
        </Switch>
        {/* <Particles /> */}
      </AppContainer>
    );
  }
}

export default AppRouter;
