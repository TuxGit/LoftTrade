import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, mapProps } from 'recompose';

import { getCurrentCurrencyPurchase, getCurrentCurrencySell, getSelectedCurrency } from '../../../ducks/currency';
import { buyCurrencyRequest, sellCurrencyRequest, getExchangeError } from '../../../ducks/wallet';
import { Container, InputWrapper, Input, Currency, ButtonSell, ButtonPurchase } from './styles'; // Button

const enhance = compose(
  withRouter,
  connect(
    state => ({
      currentCurrencyPurchase: getCurrentCurrencyPurchase(state),
      currentCurrencySell: getCurrentCurrencySell(state),
      selectedCurrency: getSelectedCurrency(state),
      error: getExchangeError(state)
    }),
    {
      buyCurrencyRequest,
      sellCurrencyRequest
    }
  ),
  mapProps(
    ({
      buyCurrencyRequest,
      currentCurrencyPurchase,
      currentCurrencySell,
      error,
      selectedCurrency,
      sellCurrencyRequest
    }) => ({
      buyCurrencyRequest,
      error,
      purchase: currentCurrencyPurchase,
      selectedCurrency,
      sell: currentCurrencySell,
      sellCurrencyRequest
    })
  )
);

class TradeOperations extends PureComponent {
  state = {
    inputFiat: 1,
    inputSell: this.props.sell,
    inputPurchase: this.props.purchase,
    currentInput: 'inputFiat'
  };

  componentWillReceiveProps (nextProps) {
    const {sell, purchase} = nextProps;
    const {currentInput} = this.state;
    this.changeInputs(currentInput, sell, purchase);
  }

  handleChange = event => {
    const {name, value} = event.target;
    const {sell, purchase} = this.props;

    this.setState(state => ({[name]: value}));
    if (isNaN(event.target.value) || event.target.value === '') {
      // return;
    } else {
      this.changeInputs(event.target.name, sell, purchase);
    }
  };

  handleBlur = () => {
    this.setState({currentInput: 'inputFiat'});
  };

  handleFocus = event => {
    this.setState({currentInput: event.target.name});
  };

  handleSell = event => {
    const {selectedCurrency} = this.props;
    const {inputFiat} = this.state;
    this.props.sellCurrencyRequest({selectedCurrency, value: inputFiat});
  };

  handleBuy = event => {
    const {selectedCurrency} = this.props;
    const {inputFiat} = this.state;
    this.props.buyCurrencyRequest({selectedCurrency, value: inputFiat});
  };

  changeInputs (name, sell, purchase) {
    switch (name) {
      case 'inputFiat': {
        this.setState(({inputFiat}) => {
          const parsed = isNaN(inputFiat) ? 0 : parseFloat(inputFiat);
          return {
            inputSell: parsed * sell,
            inputPurchase: parsed * purchase
          };
        });
        break;
      }
      case 'inputSell':
        this.setState(({inputSell}) => {
          const parsedSell = isNaN(inputSell) ? 0 : parseFloat(inputSell);
          const nextFiat = parsedSell / sell;
          return {
            inputFiat: nextFiat,
            inputPurchase: nextFiat * purchase
          };
        });
        break;
      case 'inputPurchase':
        this.setState(({inputPurchase}) => {
          const parsedPurchase = isNaN(inputPurchase) ? 0 : parseFloat(inputPurchase);
          const nextFiat = parsedPurchase / purchase;
          return {
            inputFiat: nextFiat,
            inputSell: nextFiat * sell
          };
        });
        break;
      default:
        break;
    }
  }

  render () {
    const {error, selectedCurrency} = this.props;
    const {inputFiat, inputSell, inputPurchase} = this.state;

    // Warning: `value` prop on `input` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.
    // if (!inputFiat || !inputSell || !inputPurchase) { return null; }

    return (
      <Container>
        <h2>Покупка/продажа</h2>
        <InputWrapper>
          {/* value={inputFiat || ''} */}
          <Input
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            name="inputFiat"
            value={inputFiat}
          />
          <Currency>{selectedCurrency.toUpperCase()}</Currency>
        </InputWrapper>
        <div>
          <InputWrapper>
            <Input
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              name="inputPurchase"
              value={inputPurchase}
            />
            <Currency>$</Currency>
          </InputWrapper>
          <ButtonSell onClick={this.handleSell}>Продать</ButtonSell>
        </div>
        <div>
          <InputWrapper>
            <Input
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              name="inputSell"
              value={inputSell}
            />
            <Currency>$</Currency>
          </InputWrapper>
          <ButtonPurchase onClick={this.handleBuy}>Купить</ButtonPurchase>
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </Container>
    );
  }
}

export default enhance(TradeOperations);
