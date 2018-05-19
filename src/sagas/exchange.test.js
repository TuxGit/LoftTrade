import { call, put, takeLatest } from 'redux-saga/effects';

import {
  buyCurrencyWatch, buyCurrencyFlow,
  sellCurrencyWatch, sellCurrencyFlow
} from './exchange';
import {
  buyCurrencyRequest, buyCurrencySuccess, buyCurrencyFailure,
  sellCurrencyRequest, sellCurrencySuccess, sellCurrencyFailure
} from '../ducks/wallet';
import { fetchRequest as fetchTransactionRequest } from '../ducks/transactions';
import { buyCurrency, sellCurrency } from '../api';

describe('Тестирование #buyCurrencyWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = buyCurrencyWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(buyCurrencyRequest, buyCurrencyFlow));
  });
});

describe('Тестирование саги #buyCurrencyFlow', () => {
  describe('without error', () => {
    const testResult = {
      data: {
        usd: 35.2868491299496,
        btc: 0.9637290143123035,
        eth: 1.65644369503928
      }
    };
    const action = {
      type: buyCurrencyRequest.toString(),
      payload: { selectedCurrency: 'btc', value: 1.1 }
    };
    const sagaIterator = buyCurrencyFlow(action);

    it('call fn buyCurrency', () => {
      const { selectedCurrency, value } = action.payload;
      expect(sagaIterator.next().value).toEqual(call(buyCurrency, selectedCurrency, value));
    });

    it('put buyCurrencySuccess', () => {
      expect(sagaIterator.next(testResult).value).toEqual(put(buyCurrencySuccess(testResult.data)));
    });

    it('put fetchTransactionRequest', () => {
      expect(sagaIterator.next().value).toEqual(put(fetchTransactionRequest()));
    });
  });

  describe('with error', () => {
    const action = {
      type: buyCurrencyRequest.toString(),
      payload: { selectedCurrency: 'btc', value: 1.1 }
    };
    const sagaIterator = buyCurrencyFlow(action);

    it('call fn buyCurrency', () => {
      const { selectedCurrency, value } = action.payload;
      expect(sagaIterator.next().value).toEqual(call(buyCurrency, selectedCurrency, value));
    });

    it('put buyCurrencyFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(buyCurrencyFailure(error)));
    });
  });
});

describe('Тестирование #sellCurrencyWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = sellCurrencyWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(sellCurrencyRequest, sellCurrencyFlow));
  });
});

describe('Тестирование саги #sellCurrencyFlow', () => {
  describe('without error', () => {
    const testResult = {
      data: {
        usd: 35.2868491299496,
        btc: 0.9637290143123035,
        eth: 1.65644369503928
      }
    };
    const action = {
      type: sellCurrencyRequest.toString(),
      payload: { selectedCurrency: 'btc', value: 1.1 }
    };
    const sagaIterator = sellCurrencyFlow(action);

    it('call fn sellCurrency', () => {
      const { selectedCurrency, value } = action.payload;
      expect(sagaIterator.next().value).toEqual(call(sellCurrency, selectedCurrency, value));
    });

    it('put sellCurrencySuccess', () => {
      expect(sagaIterator.next(testResult).value).toEqual(put(sellCurrencySuccess(testResult.data)));
    });

    it('put fetchTransactionRequest', () => {
      expect(sagaIterator.next().value).toEqual(put(fetchTransactionRequest()));
    });
  });

  describe('with error', () => {
    const action = {
      type: sellCurrencyRequest.toString(),
      payload: { selectedCurrency: 'btc', value: 1.1 }
    };
    const sagaIterator = sellCurrencyFlow(action);

    it('call fn sellCurrency', () => {
      const { selectedCurrency, value } = action.payload;
      expect(sagaIterator.next().value).toEqual(call(sellCurrency, selectedCurrency, value));
    });

    it('put sellCurrencyFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(sellCurrencyFailure(error)));
    });
  });
});
