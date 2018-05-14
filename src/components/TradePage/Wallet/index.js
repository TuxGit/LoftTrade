import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getCoins } from '../../../ducks/wallet';
import { CoinContainer, CoinInput, CoinInputInteger, CoinInputFraction, CoinCurrency } from './styles';

class Wallet extends PureComponent {
  render () {
    const { coins } = this.props;

    if (!coins) return null;

    const usdSplited = String(coins.usd).split('.');
    const btcSplited = String(coins.btc).split('.');
    const ethSplited = String(coins.eth).split('.');

    return (
      <article>
        <h2>Ваш счет</h2>
        <CoinContainer>
          <CoinInput>
            <CoinInputInteger>{usdSplited[0]}</CoinInputInteger>.<CoinInputFraction>{usdSplited[1] || 0}</CoinInputFraction>
          </CoinInput>
          <CoinCurrency>$</CoinCurrency>
        </CoinContainer>
        <CoinContainer>
          <CoinInput>
            <CoinInputInteger>{btcSplited[0]}</CoinInputInteger>.<CoinInputFraction>{btcSplited[1] || 0}</CoinInputFraction>
          </CoinInput>
          <CoinCurrency>BTC</CoinCurrency>
        </CoinContainer>
        <CoinContainer>
          <CoinInput>
            <CoinInputInteger>{ethSplited[0]}</CoinInputInteger>.<CoinInputFraction>{ethSplited[1] || 0}</CoinInputFraction>
          </CoinInput>
          <CoinCurrency>ETH</CoinCurrency>
        </CoinContainer>
      </article>
    );
  }
}

export default connect(
  state => ({
    coins: getCoins(state)
  }),
  { }
)(Wallet);
