import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

const {
  currency: {
    selectOffset,
    selectBtc,
    selectEth,

    fetchBtcRequest,
    fetchBtcSuccess,
    fetchBtcFailure,

    fetchEthRequest,
    fetchEthSuccess,
    fetchEthFailure
  }
} = createActions({
  CURRENCY: {
    SELECT_OFFSET: null,
    SELECT_BTC: null,
    SELECT_ETH: null,

    FETCH_BTC_REQUEST: null,
    FETCH_BTC_SUCCESS: null,
    FETCH_BTC_FAILURE: null,

    FETCH_ETH_REQUEST: null,
    FETCH_ETH_SUCCESS: null,
    FETCH_ETH_FAILURE: null
  }
});

/*
selected(pin): "btc"
offset(pin): "4h"
btc(pin): []
eth(pin): []
isBtcLoading(pin): true
isEthLoading(pin): true
*/
const selected = handleActions(
  {
    [selectBtc]: () => 'btc',
    [selectEth]: () => 'eth'
  },
  'btc'
);

const offset = handleActions(
  {
    [selectOffset]: (state, action) => action.payload
  },
  '8h'
);

const btc = handleActions(
  {
    // [fetchBtcRequest]: () => [],
    [fetchBtcSuccess]: (state, action) => action.payload,
    [fetchBtcFailure]: () => []
  },
  []
);

const eth = handleActions(
  {
    // [fetchEthRequest]: () => [],
    [fetchEthSuccess]: (state, action) => action.payload,
    [fetchEthFailure]: () => []
  },
  []
);

const isBtcFetching = handleActions(
  {
    [fetchBtcRequest]: () => true,
    [fetchBtcSuccess]: () => false,
    [fetchBtcFailure]: () => false
  },
  false
);

const isEthFetching = handleActions(
  {
    [fetchEthRequest]: () => true,
    [fetchEthSuccess]: () => false,
    [fetchEthFailure]: () => false
  },
  false
);

export default combineReducers({
  selected,
  offset,
  btc,
  eth,
  isBtcFetching,
  isEthFetching
});

export {
  selectOffset,
  selectBtc,
  selectEth,

  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,

  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure
};

export const getOffsetCurency = state => state.currency.offset;
export const getSelectedCurency = state => state.currency.selected;
export const getBtcData = state => state.currency.btc;
export const getEthData = state => state.currency.eth;
export const getIsBtcFetching = state => state.currency.isBtcFetching;
export const getIsEthFetching = state => state.currency.isEthFetching;
export const getBtcLatest = state => { // getBtcRate, getBtcCurrent
  return (state.currency.btc.length > 0) ? state.currency.btc[0] : null;
};
export const getEthLatest = state => {
  return (state.currency.eth.length > 0) ? state.currency.eth[0] : null;
};