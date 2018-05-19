import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  authStartFlow, loginWatch, loginFlow,
  registerWatch, registerFlow
} from './auth';
import {
  getIsAuthorized,
  loginRequest, loginSuccess, loginFailure,
  registrationRequest, registrationSuccess, registrationFailure
} from '../ducks/auth';
import { login, setTokenApi, registration } from '../api';
import { setTokenToLocalStorage, getTokenFromLocalStorage } from '../utils/localStorage';

// auth on start
describe('Тестирование #authStartFlow', () => {
  const sagaIterator = authStartFlow();

  it('select getIsAuthorized', () => {
    expect(sagaIterator.next().value).toEqual(select(getIsAuthorized));
  });

  it('call fn getTokenFromLocalStorage', () => {
    expect(sagaIterator.next().value).toEqual(call(getTokenFromLocalStorage));
  });

  it('put loginSuccess', () => {
    expect(sagaIterator.next(true).value).toEqual(put(loginSuccess()));
  });

  it('call setTokenApi', () => {
    expect(sagaIterator.next().value).toEqual(call(setTokenApi, true));
  });
});

// login
describe('Тестирование #loginWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = loginWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(loginRequest, loginFlow));
  });
});

describe('Тестирование саги #loginFlow', () => {
  describe('without error', () => {
    const testResult = {
      data: { jwt: 'test-jwt-token' }
    };
    const action = {
      type: loginRequest.toString(),
      payload: { email: 'email', password: 'passwd' }
    };
    const sagaIterator = loginFlow(action);

    it('call fn login', () => {
      expect(sagaIterator.next().value).toEqual(call(login, action.payload));
    });

    it('put loginSuccess', () => {
      expect(sagaIterator.next(testResult).value).toEqual(put(loginSuccess()));
    });

    it('call setTokenApi', () => {
      expect(sagaIterator.next().value).toEqual(call(setTokenApi, testResult.data.jwt));
    });

    it('call setTokenToLocalStorage', () => {
      expect(sagaIterator.next().value).toEqual(call(setTokenToLocalStorage, testResult.data.jwt));
    });
  });

  describe('with error', () => {
    const action = {
      type: loginRequest.toString(),
      payload: { email: 'email', password: 'passwd' }
    };
    const sagaIterator = loginFlow(action);

    it('call fn login', () => {
      expect(sagaIterator.next().value).toEqual(call(login, action.payload));
    });

    it('put loginFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(loginFailure(error)));
    });
  });
});

// registration
describe('Тестирование #registerWatch', () => {
  it('should call takeLatest', () => {
    const sagaIterator = registerWatch();

    expect(sagaIterator.next().value).toEqual(takeLatest(registrationRequest, registerFlow));
  });
});

describe('Тестирование саги #registerFlow', () => {
  describe('without error', () => {
    const testResult = {
      data: { jwt: 'test-jwt-token' }
    };
    const action = {
      type: registrationRequest.toString(),
      payload: { email: 'email', password: 'passwd' }
    };
    const sagaIterator = registerFlow(action);

    it('call fn registration', () => {
      expect(sagaIterator.next().value).toEqual(call(registration, action.payload));
    });

    it('put registrationSuccess', () => {
      expect(sagaIterator.next(testResult).value).toEqual(put(registrationSuccess()));
    });

    it('call setTokenApi', () => {
      expect(sagaIterator.next().value).toEqual(call(setTokenApi, testResult.data.jwt));
    });

    it('call setTokenToLocalStorage', () => {
      expect(sagaIterator.next().value).toEqual(call(setTokenToLocalStorage, testResult.data.jwt));
    });
  });

  describe('with error', () => {
    const action = {
      type: loginRequest.toString(),
      payload: { email: 'email', password: 'passwd' }
    };
    const sagaIterator = registerFlow(action);

    it('call fn registration', () => {
      expect(sagaIterator.next().value).toEqual(call(registration, action.payload));
    });

    it('put registrationFailure', () => {
      const error = new Error('test error');
      expect(sagaIterator.throw(error).value).toEqual(put(registrationFailure(error)));
    });
  });
});
