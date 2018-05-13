import { takeLatest, call, put } from 'redux-saga/effects';

import { getUserInfo } from '../api';
import { fetchRequest, fetchSuccess, fetchFailure } from '../ducks/user';
// import requestFlow from './request';

export function* fetchUserWatch () {
  yield takeLatest(fetchRequest, fetchUserFlow);
}

export function* fetchUserFlow (action) {
  try {
    const response = yield call(getUserInfo, action.payload);
    yield put(fetchSuccess(response.data.result));
  } catch (error) {
    yield put(fetchFailure(error));
  }
}
