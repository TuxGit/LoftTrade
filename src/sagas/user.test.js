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
    // const fnGetUserInfo = ({ email, password }) => {
    //   return {
    //     data: { result: {id: 412, email: 'testuser@loft.ru'} }
    //   };
    // };
    const getUserResult = {
      data: { result: {id: 42, email: 'test@loft.ru'} }
    };
    const action = {
      type: fetchRequest.toString(),
      payload: { email: '', password: '' }
    };
    const sagaIterator = fetchUserFlow(action);

    it('call fn getUserInfo', () => {
      // console.log(sagaIterator.next().value);
      // console.log(call(getUserInfo, action.payload));
      // console.log(call(fnGetUserInfo, action.payload));
      // console.log(call(getUserInfo));

      expect(sagaIterator.next().value).toEqual(call(getUserInfo, action.payload));
    });

    it('put fetchSuccess', () => {
      expect(sagaIterator.next(getUserResult).value).toEqual(put(fetchSuccess(getUserResult.data.result)));
    });
  });

  describe('with error', () => {
    // const getUserResult = {
    //   data: { result: {id: 42, email: 'test@loft.ru'} }
    // };
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
      // (sagaIterator.next(null).value)
      expect(sagaIterator.throw(error).value).toEqual(put(fetchFailure(error)));
    });
  });
});
