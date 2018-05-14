import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

const {
  wallet: {
    fetchRequest,
    fetchSuccess,
    fetchFailure,

    buyCurrencyRequest,
    buyCurrencySuccess,
    buyCurrencyFailure,
    sellCurrencyRequest,
    sellCurrencySuccess,
    sellCurrencyFailure
  }
} = createActions({
  WALLET: {
    FETCH_REQUEST: null,
    FETCH_SUCCESS: null,
    FETCH_FAILURE: null,

    BUY_CURRENCY_REQUEST: null,
    BUY_CURRENCY_SUCCESS: null,
    BUY_CURRENCY_FAILURE: null,
    SELL_CURRENCY_REQUEST: null,
    SELL_CURRENCY_SUCCESS: null,
    SELL_CURRENCY_FAILURE: null
  }
});

/*
isLoading(pin): false
error(pin): null
coins:
  usd(pin): 546.803750040001
  btc(pin): 1
  eth(pin): 0.014748583840979589
*/
const isFetching = handleActions(
  {
    [fetchRequest]: () => true,
    [fetchSuccess]: () => false,
    [fetchFailure]: () => false
  },
  false
);

const error = handleActions( // fetchError
  {
    [fetchRequest]: () => null,
    [fetchSuccess]: () => null,
    [fetchFailure]: (state, action) => action.payload
  },
  null
);

const exchangeError = handleActions(
  {
    [buyCurrencyRequest]: () => null,
    [sellCurrencyRequest]: () => null,
    [buyCurrencyFailure]: (state, action) => action.payload,
    [sellCurrencyFailure]: (state, action) => action.payload
  },
  null
);

const coins = handleActions( // data
  {
    // [fetchRequest]: (state, action) => null,
    [fetchSuccess]: (state, action) => action.payload,
    [buyCurrencySuccess]: (state, action) => action.payload,
    [sellCurrencySuccess]: (state, action) => action.payload
  },
  null
);

export default combineReducers({
  isFetching,
  error,
  exchangeError,
  coins
});

export {
  fetchRequest, fetchSuccess, fetchFailure,
  buyCurrencyRequest, buyCurrencySuccess, buyCurrencyFailure,
  sellCurrencyRequest, sellCurrencySuccess, sellCurrencyFailure
};

export const getIsFetching = state => state.wallet.isFetching;
export const getCoins = state => state.wallet.coins; // getData
export const getExchangeError = state => state.wallet.exchangeError;
