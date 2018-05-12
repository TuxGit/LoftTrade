import { call, put, select, takeLatest } from 'redux-saga/effects';

import { setTokenApi, login, registration } from '../api';
import { setTokenToLocalStorage, getTokenFromLocalStorage } from '../utils/localStorage';
import {
  getIsAuthorized,
  loginRequest, loginSuccess, loginFailure,
  registrationRequest, registrationSuccess, registrationFailure
} from '../ducks/auth';

export function* authStartFlow () {
  // while (true) {
  const isAuthorized = yield select(getIsAuthorized);
  const localStorageToken = yield call(getTokenFromLocalStorage);
  let token;

  if (!isAuthorized && localStorageToken) {
    token = localStorageToken;
    yield put(loginSuccess());

    yield call(setTokenApi, token);
  }
}

export function* loginWatch () {
  yield takeLatest(loginRequest, loginFlow);
}

export function* loginFlow (action) {
  let token = null;
  // console.log('action', action);
  try {
    const response = yield call(login, action.payload);
    // console.log('resp', response);
    token = response.data.jwt;
    yield put(loginSuccess());

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
  } catch (error) {
    // console.log('error', error);
    yield put(loginFailure(error));
  }
}

export function* registerWatch () {
  yield takeLatest(registrationRequest, registerFlow);
}

export function* registerFlow (action) {
  let token = null;
  // console.log('action', action);
  try {
    const response = yield call(registration, action.payload);
    // console.log('resp', response);
    token = response.data.jwt;
    yield put(registrationSuccess());

    yield call(setTokenApi, token);
    yield call(setTokenToLocalStorage, token);
  } catch (error) {
    // console.log('error', error);
    yield put(registrationFailure(error));
  }
}
