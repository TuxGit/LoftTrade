import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Container, Content } from './styles';

class Main extends PureComponent {
  render () {
    // const { isAuthorized, errorMessage, logout } = this.props;

    return (
      <Container>
        <Content>
          <h3>Hello!</h3>
        </Content>
      </Container>
    );
  }
}

export default Main;
