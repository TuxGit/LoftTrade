import { takeLatest, call, put } from 'redux-saga/effects';

import { buyCurrency, sellCurrency } from '../api';
import {
  buyCurrencyRequest, buyCurrencySuccess, buyCurrencyFailure,
  sellCurrencyRequest, sellCurrencySuccess, sellCurrencyFailure
} from '../ducks/wallet';
import { fetchRequest } from '../ducks/transactions';
// import requestFlow from './request';

export function* buyCurrencyWatch () {
  yield takeLatest(buyCurrencyRequest, buyCurrencyFlow);
}

export function* buyCurrencyFlow (action) {
  try {
    const { selectedCurrency, value } = action.payload;
    const response = yield call(buyCurrency, selectedCurrency, value);
    yield put(buyCurrencySuccess(response.data));
    yield put(fetchRequest());
  } catch (error) {
    yield put(buyCurrencyFailure(error));
  }
}

export function* sellCurrencyWatch () {
  yield takeLatest(sellCurrencyRequest, sellCurrencyFlow);
}

export function* sellCurrencyFlow (action) {
  try {
    const { selectedCurrency, value } = action.payload;
    const response = yield call(sellCurrency, selectedCurrency, value);
    yield put(sellCurrencySuccess(response.data));
    yield put(fetchRequest());
  } catch (error) {
    yield put(sellCurrencyFailure(error));
  }
}
