import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';
import { fetchRequest as fetchUserRequest, getIsFetching, getData } from '../../ducks/user';
import { fetchRequest as fetchWalletRequest } from '../../ducks/wallet';
import { getBtcLatest, getEthLatest } from '../../ducks/currency';

export class TradePage extends PureComponent {
  // componentDidMount () {
  //   const routerMatch = this.props.match;
  //   const userLogin = routerMatch && routerMatch.params.login;

  //   this.loadData(userLogin);
  // }

  // componentDidUpdate (prevProps, prevState) {
  //   const userLogin = this.props.match.params.login;

  //   if (this.props.match.params.login !== prevProps.match.params.login) {
  //     this.loadData(userLogin);
  //   }
  // }

  // loadData (userLogin) {
  //   if (userLogin === 'me') {
  //     this.props.fetchRequest();
  //   } else if (userLogin) {
  //     this.props.fetchRequest(userLogin);
  //   }
  // }
  componentDidMount () {
    this.props.fetchUserRequest();
    this.props.fetchWalletRequest();
  }

  render () {
    const { match, user, btc, eth } = this.props;
    const currencyName = match.params.name;

    return (
      <React.Fragment>
        <Header user={user} btc={btc} eth={eth} />
        <Main />
        <Footer />
      </React.Fragment>
    );
  }
}

// export default TradePage;
export default connect(
  state => ({
    user: getData(state),
    btc: getBtcLatest(state),
    eth: getEthLatest(state)
    // isFetching: getIsFetching(state)
  }),
  { fetchUserRequest, fetchWalletRequest }
)(TradePage);
