import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

const {
  wallet: {
    fetchRequest,
    fetchSuccess,
    fetchFailure
  }
} = createActions({
  WALLET: {
    FETCH_REQUEST: null,
    FETCH_SUCCESS: null,
    FETCH_FAILURE: null
  }
});

/*
isLoading(pin): false
error(pin): null
coins:
  usd(pin): 546.803750040001
  btc(pin): 1
  eth(pin): 0.014748583840979589
*/
const isFetching = handleActions(
  {
    [fetchRequest]: () => true,
    [fetchSuccess]: () => false,
    [fetchFailure]: () => false
  },
  false
);

const error = handleActions(
  {
    [fetchRequest]: () => null,
    [fetchSuccess]: () => null,
    [fetchFailure]: (state, action) => action.payload
  },
  null
);

const coins = handleActions( // data
  {
    // [fetchRequest]: (state, action) => null,
    [fetchSuccess]: (state, action) => action.payload
  },
  null
);

export default combineReducers({
  isFetching,
  error,
  coins
});

export { fetchRequest, fetchSuccess, fetchFailure };

export const getIsFetching = state => state.wallet.isFetching;
export const getCoins = state => state.wallet.coins; // getData
