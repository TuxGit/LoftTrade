import user, { fetchRequest, fetchSuccess, fetchFailure } from './user';

const INIT_STATE = {
  isFetching: false,
  error: null,
  data: null
};

describe('Тестирование редьюсера user', () => {
  it('инициализация State', () => {
    const state0 = user(undefined, { type: '@@TEST/INIT' });

    expect(state0).toEqual(INIT_STATE);
  });

  it('проверка экшена fetchRequest', () => {
    const state = user(INIT_STATE, fetchRequest());

    expect(state.isFetching).toBeTruthy();
    expect(state.error).toBeNull();
    expect(state.data).toBeNull();
  });

  it('проверка экшена fetchSuccess', () => {
    const payload = { id: 1, email: 'test@loft.ru' };
    const state = user(INIT_STATE, fetchSuccess(payload));

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toBeNull();
    expect(state.data).toEqual(payload);
  });

  it('проверка экшена fetchFailure', () => {
    const payload = { message: 'error' };
    const state = user(INIT_STATE, fetchFailure(payload));

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toEqual(payload);
    expect(state.data).toBeNull();
  });
});
