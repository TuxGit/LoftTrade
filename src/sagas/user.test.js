import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchUserWatch, fetchUserFlow } from './user';
import { fetchRequest, fetchSuccess, fetchFailure } from '../ducks/user';
import { getUserInfo } from '../api';

describe('Тестирование #fetchUserWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = fetchUserWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(fetchRequest, fetchUserFlow));
  });
});

describe('Тестирование саги #fetchUserFlow', () => {
  describe('without error', () => {
    const getUserResult = {
      data: { result: {id: 42, email: 'test@loft.ru'} }
    };
    const action = {
      type: fetchRequest.toString(),
      payload: { email: '', password: '' }
    };
    const sagaIterator = fetchUserFlow(action);

    it('call fn getUserInfo', () => {
      expect(sagaIterator.next().value).toEqual(call(getUserInfo, action.payload));
    });

    it('put fetchSuccess', () => {
      expect(sagaIterator.next(getUserResult).value).toEqual(put(fetchSuccess(getUserResult.data.result)));
    });
  });

  describe('with error', () => {
    const action = {
      type: fetchRequest.toString(),
      payload: { email: '', password: '' }
    };
    const sagaIterator = fetchUserFlow(action);

    it('call fn getUserInfo', () => {
      expect(sagaIterator.next().value).toEqual(call(getUserInfo, action.payload));
    });

    it('put fetchFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(fetchFailure(error)));
    });
  });
});
