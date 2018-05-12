import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getIsAuthorized } from '../../ducks/auth';

class HomePage extends PureComponent {
  render () {
    const { isAuthorized } = this.props;

    return !isAuthorized
      ? <Redirect to="/login" />
      : <Redirect to="/trade/btc"/>;
  }
}

export default connect(
  state => ({
    isAuthorized: getIsAuthorized(state)
  })
)(HomePage);
