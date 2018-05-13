import { fork } from 'redux-saga/effects';

import { authStartFlow, loginWatch, registerWatch } from './auth';
import { fetchUserWatch } from './user';
import { fetchWalletWatch, fetchBtcWatch, fetchEthWatch, currencyWatch } from './currency';

export default function* () {
  yield fork(authStartFlow);
  yield fork(loginWatch);
  yield fork(registerWatch);
  yield fork(fetchUserWatch);

  yield fork(fetchBtcWatch);
  yield fork(fetchEthWatch);
  yield fork(currencyWatch);

  yield fork(fetchWalletWatch);
}
