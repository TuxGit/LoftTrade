import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchTransactionsWatch, fetchTransactionsFlow } from './transactions';
import { fetchRequest, fetchSuccess, fetchFailure } from '../ducks/transactions';
import { getUserTransactions } from '../api';

describe('Тестирование #fetchTransactionsWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = fetchTransactionsWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(fetchRequest, fetchTransactionsFlow));
  });
});

describe('Тестирование саги #fetchTransactionsFlow', () => {
  describe('without error', () => {
    const getUserTransactionsResult = {
      data: { result: [{
        id: 3957,
        btc_delta: '+0.006110713914706655',
        usd_delta: '-50.0',
        created_at: '2018-05-17T18:43:31.235Z'
      }] }
    };
    const action = {
      type: fetchRequest.toString()
    };
    const sagaIterator = fetchTransactionsFlow(action);

    it('call fn getUserTransactions', () => {
      expect(sagaIterator.next().value).toEqual(call(getUserTransactions, action.payload));
    });

    it('put fetchSuccess', () => {
      expect(sagaIterator.next(getUserTransactionsResult).value).toEqual(put(fetchSuccess(getUserTransactionsResult.data.result)));
    });
  });

  describe('with error', () => {
    const action = {
      type: fetchRequest.toString()
    };
    const sagaIterator = fetchTransactionsFlow(action);

    it('call fn getUserInfo', () => {
      expect(sagaIterator.next().value).toEqual(call(getUserTransactions, action.payload));
    });

    it('put fetchFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(fetchFailure(error)));
    });
  });
});
