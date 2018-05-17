import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../Footer';
import Main from './Main';
import { fetchRequest as fetchUserRequest, getData as getUserData } from '../../ducks/user';
import { fetchRequest as fetchWalletRequest } from '../../ducks/wallet';
import { getBtcLatest, getEthLatest, selectBtc, selectEth } from '../../ducks/currency';
import { fetchRequest as fetchTransactionsRequest } from '../../ducks/transactions';

export class TradePage extends PureComponent {
  componentDidMount () {
    const routeMatch = this.props.match;
    if (routeMatch && routeMatch.params.name === 'eth') {
      this.props.selectEth();
    }
    this.props.fetchUserRequest();
    this.props.fetchWalletRequest();
    this.props.fetchTransactionsRequest();
  }

  render () {
    const { match, user, btc, eth } = this.props;
    const currencyName = match.params.name;

    return (
      <React.Fragment>
        <Header
          user={user}
          btc={btc}
          eth={eth}
          currentCurrency={currencyName}
        />
        <Main />
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    user: getUserData(state),
    btc: getBtcLatest(state),
    eth: getEthLatest(state)
  }),
  { fetchUserRequest, fetchWalletRequest, selectBtc, selectEth, fetchTransactionsRequest }
)(TradePage);
