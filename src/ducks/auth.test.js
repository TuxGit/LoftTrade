import auth, {
  loginRequest, loginSuccess, loginFailure,
  logout,
  registrationRequest, registrationSuccess, registrationFailure
} from './auth';

const INIT_STATE = {
  isAuthorized: false,
  loginError: null,
  registrationError: null
};

describe('Тестирование редьюсера auth', () => {
  it('инициализация State', () => {
    const state0 = auth(undefined, { type: '@@TEST/INIT' });

    expect(state0).toEqual(INIT_STATE);
  });

  // login
  it('проверка экшена loginRequest', () => {
    const state = auth(INIT_STATE, loginRequest({email: '', password: ''}));

    expect(state.loginError).toBeNull();
  });

  it('проверка экшена loginSuccess', () => {
    const state = auth(INIT_STATE, loginSuccess());

    // expect(state.loginError).toBeNull();
    expect(state.isAuthorized).toBeTruthy();
  });

  it('проверка экшена loginFailure', () => {
    const payload = { message: 'error' };
    const state = auth(INIT_STATE, loginFailure({ data: payload }));

    expect(state.loginError).toEqual(payload);
  });

  // logout
  it('проверка экшена logout', () => {
    const state = auth(INIT_STATE, logout());

    expect(state.isAuthorized).toBeFalsy();
  });

  // registration
  it('проверка экшена registrationRequest', () => {
    const state = auth(INIT_STATE, registrationRequest({email: '', password: ''}));

    expect(state.registrationError).toBeNull();
  });

  it('проверка экшена registrationSuccess', () => {
    const state = auth(INIT_STATE, registrationSuccess());

    expect(state.registrationError).toBeNull();
  });

  it('проверка экшена registrationFailure', () => {
    const payload = { message: 'error' };
    const state = auth(INIT_STATE, registrationFailure({ data: payload }));

    expect(state.registrationError).toEqual(payload);
  });
});
