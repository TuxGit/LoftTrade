import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

const {
  transactions: {
    fetchRequest,
    fetchSuccess,
    fetchFailure
  }
} = createActions({
  TRANSACTIONS: {
    FETCH_REQUEST: null,
    FETCH_SUCCESS: null,
    FETCH_FAILURE: null
  }
});

/*
isLoading
error
records
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

const records = handleActions( // data
  {
    [fetchRequest]: (state, action) => null,
    [fetchSuccess]: (state, action) => action.payload
  },
  null
);

export default combineReducers({
  isFetching,
  error,
  records
});

export { fetchRequest, fetchSuccess, fetchFailure };

export const getIsFetching = state => state.transactions.isFetching;
export const getRecords = state => state.transactions.records; // getData
