import { takeLatest, call, put } from 'redux-saga/effects';

import { getUserTransactions } from '../api';
import { fetchRequest, fetchSuccess, fetchFailure } from '../ducks/transactions';
// import requestFlow from './request';

export function* fetchTransactionsWatch () {
  yield takeLatest(fetchRequest, fetchTransactionsFlow);
}

export function* fetchTransactionsFlow (action) {
  try {
    const response = yield call(getUserTransactions, action.payload);
    yield put(fetchSuccess(response.data.result));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}
