import { takeLatest, fork, take, select, put, cancel, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { loginSuccess, logout } from '../ducks/auth';
import {
  selectBtc,
  selectEth,
  fetchBtcRequest,
  fetchEthRequest,
  fetchBtcSuccess,
  fetchBtcFailure,
  fetchEthFailure,
  fetchEthSuccess,
  selectOffset,

  getOffsetCurency as getOffset } from '../ducks/currency';
import {
  fetchRequest as fetchWalletRequest,
  fetchSuccess as fetchWalletSuccess,
  fetchFailure as fetchWalletFailure } from '../ducks/wallet';
import { candles, getWallet } from '../api';
// import { changeLocation } from '../actions/location';

export function* fetchBtcFlow (action) {
  try {
    const response = yield call(candles, 'btc', action.payload);
    yield put(fetchBtcSuccess(response.data.result));
  } catch (error) {
    yield put(fetchBtcFailure(error));
  }
}

export function* fetchEthFlow (action) {
  try {
    const response = yield call(candles, 'eth', action.payload);
    yield put(fetchEthSuccess(response.data.result));
  } catch (error) {
    yield put(fetchEthFailure(error));
  }
}

export function* loginCurrencyFlow () {
  while (true) {
    const offset = yield select(getOffset);
    yield put(fetchBtcRequest(offset));
    yield put(fetchEthRequest(offset));

    yield delay(15000);
  }
}

export function* currencyWatch () {
  let currencyTask;
  while (true) {
    const action = yield take([loginSuccess, logout, selectBtc, selectEth, selectOffset]); // , changeLocation

    if (currencyTask) {
      yield cancel(currencyTask);
      currencyTask = undefined;
    }
    if (action.type !== logout.toString()) currencyTask = yield fork(loginCurrencyFlow);
  }
}

export function* fetchWalletFlow () {
  try {
    const response = yield call(getWallet);
    yield put(fetchWalletSuccess(response.data.result));
  } catch (error) {
    yield put(fetchWalletFailure(error));
  }
}

export function* fetchWalletWatch () {
  yield takeLatest(fetchWalletRequest, fetchWalletFlow);
}

export function* fetchBtcWatch () {
  yield takeLatest(fetchBtcRequest, fetchBtcFlow);
}

export function* fetchEthWatch () {
  yield takeLatest(fetchEthRequest, fetchEthFlow);
}
