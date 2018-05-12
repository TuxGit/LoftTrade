import { combineReducers } from 'redux';
import { handleActions, createActions } from 'redux-actions';

const {
  auth: {
    loginRequest,
    loginSuccess,
    loginFailure,
    logout,
    registrationRequest,
    registrationSuccess,
    registrationFailure
  }
} = createActions({
  AUTH: {
    LOGIN_REQUEST: null,
    LOGIN_SUCCESS: null,
    LOGIN_FAILURE: null,
    LOGOUT: null,
    REGISTRATION_REQUEST: null,
    REGISTRATION_SUCCESS: null,
    REGISTRATION_FAILURE: null
  }
});

const isAuthorized = handleActions(
  {
    [loginSuccess]: () => true,
    [logout]: () => false
  },
  false
);

const loginError = handleActions(
  {
    [loginRequest]: () => null,
    [loginSuccess]: () => null,
    [loginFailure]: (state, action) => action.payload.data
  },
  null
);

const registrationError = handleActions(
  {
    [registrationRequest]: () => null,
    [registrationSuccess]: () => null,
    [registrationFailure]: (state, action) => action.payload.data
  },
  null
);

// reducers
export default combineReducers({
  isAuthorized,
  loginError,
  registrationError
});

// actions
export {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registrationRequest,
  registrationSuccess,
  registrationFailure
};

// selectors
export const getIsAuthorized = state => state.auth.isAuthorized;
export const getLoginError = state => state.auth.loginError;
export const getRegistrationError = state => state.auth.registrationError;
