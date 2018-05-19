import { call, put, select, take, takeLatest, fork } from 'redux-saga/effects';

import {
  fetchBtcWatch, fetchBtcFlow, fetchEthWatch, fetchEthFlow,
  fetchWalletWatch, fetchWalletFlow,
  loginCurrencyFlow, currencyWatch
} from './currency';
import { loginSuccess, logout } from '../ducks/auth';
import {
  selectOffset,
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthRequest,
  fetchEthSuccess,
  fetchEthFailure,
  getOffsetCurency as getOffset
} from '../ducks/currency';
import {
  fetchRequest as fetchWalletRequest,
  fetchSuccess as fetchWalletSuccess,
  fetchFailure as fetchWalletFailure } from '../ducks/wallet';
// import { loginSuccess, logout } from '../ducks/auth';
import { candles, getWallet } from '../api';
// import { setTokenToLocalStorage, getTokenFromLocalStorage } from '../utils/localStorage';

// fetch Btc
describe('Тестирование #fetchBtcWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = fetchBtcWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(fetchBtcRequest, fetchBtcFlow));
  });
});

describe('Тестирование саги #fetchBtcFlow', () => {
  describe('without error', () => {
    const testResult = {
      data: { result: [{mts: 1526757420000, sell: 8287.6, purchase: 8204.724}] }
    };
    const action = {
      type: fetchBtcRequest.toString()
    };
    const sagaIterator = fetchBtcFlow(action);

    it('call fn candles', () => {
      expect(sagaIterator.next().value).toEqual(call(candles, 'btc', action.payload));
    });

    it('put fetchBtcSuccess', () => {
      expect(sagaIterator.next(testResult).value).toEqual(put(fetchBtcSuccess(testResult.data.result)));
    });
  });

  describe('with error', () => {
    const action = {
      type: fetchBtcRequest.toString()
    };
    const sagaIterator = fetchBtcFlow(action);

    it('call fn candles', () => {
      expect(sagaIterator.next().value).toEqual(call(candles, 'btc', action.payload));
    });

    it('put fetchBtcFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(fetchBtcFailure(error)));
    });
  });
});

// fetch Eth
describe('Тестирование #fetchEthWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = fetchEthWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(fetchEthRequest, fetchEthFlow));
  });
});

describe('Тестирование саги #fetchEthFlow', () => {
  describe('without error', () => {
    const testResult = {
      data: { result: [{mts: 1526757420000, sell: 8287.6, purchase: 8204.724}] }
    };
    const action = {
      type: fetchEthRequest.toString()
    };
    const sagaIterator = fetchEthFlow(action);

    it('call fn candles', () => {
      expect(sagaIterator.next().value).toEqual(call(candles, 'eth', action.payload));
    });

    it('put fetchEthSuccess', () => {
      expect(sagaIterator.next(testResult).value).toEqual(put(fetchEthSuccess(testResult.data.result)));
    });
  });

  describe('with error', () => {
    const action = {
      type: fetchEthRequest.toString()
    };
    const sagaIterator = fetchEthFlow(action);

    it('call fn candles', () => {
      expect(sagaIterator.next().value).toEqual(call(candles, 'eth', action.payload));
    });

    it('put fetchEthFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(fetchEthFailure(error)));
    });
  });
});

// fetch Wallet
describe('Тестирование #fetchWalletWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = fetchWalletWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(fetchWalletRequest, fetchWalletFlow));
  });
});

describe('Тестирование саги #fetchWalletFlow', () => {
  describe('without error', () => {
    const testResult = {
      data: { result: {btc: 0.96385146729036, eth: 1.65644369503928, usd: 34.2968491299496} }
    };
    const action = {
      type: fetchWalletFlow.toString()
    };
    const sagaIterator = fetchWalletFlow(action);

    it('call fn getWallet', () => {
      expect(sagaIterator.next().value).toEqual(call(getWallet));
    });

    it('put fetchWalletSuccess', () => {
      expect(sagaIterator.next(testResult).value).toEqual(put(fetchWalletSuccess(testResult.data.result)));
    });
  });

  describe('with error', () => {
    const action = {
      type: fetchWalletFlow.toString()
    };
    const sagaIterator = fetchWalletFlow(action);

    it('call fn getWallet', () => {
      expect(sagaIterator.next().value).toEqual(call(getWallet));
    });

    it('put fetchWalletFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(fetchWalletFailure(error)));
    });
  });
});

// loginCurrencyFlow
describe('Тестирование саги #loginCurrencyFlow', () => {
  const offset = '4h';
  const sagaIterator = loginCurrencyFlow();

  it('select getOffset', () => {
    expect(sagaIterator.next().value).toEqual(select(getOffset));
  });

  it('put fetchBtcRequest', () => {
    expect(sagaIterator.next(offset).value).toEqual(put(fetchBtcRequest(offset)));
  });

  it('put fetchEthRequest', () => {
    expect(sagaIterator.next(offset).value).toEqual(put(fetchEthRequest(offset)));
  });
});

// currencyWatch
describe('Тестирование саги #currencyWatch', () => {
  const action = {
    type: loginSuccess.toString()
  };
  const sagaIterator = currencyWatch();

  it('take actions[]', () => {
    expect(sagaIterator.next().value).toEqual(take([loginSuccess, logout, selectBtc, selectEth, selectOffset]));
  });

  it('fork loginCurrencyFlow', () => {
    expect(sagaIterator.next(action).value).toEqual(fork(loginCurrencyFlow));
  });
});
