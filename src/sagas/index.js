import { fork } from 'redux-saga/effects';

import { authStartFlow, loginWatch, registerWatch } from './auth';
// import { fetchWalletWatch, fetchBtcWatch, fetchEthWatch } from './currency';

export default function* () {
  yield fork(authStartFlow);
  yield fork(loginWatch);
  yield fork(registerWatch);
  // yield fork(fetchWalletWatch);
  // yield fork(fetchBtcWatch);
  // yield fork(fetchEthWatch);
}
