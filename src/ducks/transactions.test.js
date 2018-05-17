import transactions, { fetchRequest, fetchSuccess, fetchFailure } from './transactions';

const INIT_STATE = {
  isFetching: false,
  error: null,
  records: null
};

describe('Тестирование редьюсера transactions', () => {
  it('инициализация State', () => {
    const state0 = transactions(undefined, { type: '@@TEST/INIT' });

    expect(state0).toEqual(INIT_STATE);
  });

  it('проверка экшена fetchRequest', () => {
    const state = transactions(INIT_STATE, fetchRequest());

    expect(state.isFetching).toBeTruthy();
    expect(state.error).toBeNull();
    expect(state.records).toBeNull();
  });

  it('проверка экшена fetchSuccess', () => {
    const payload = [{
      id: 3957,
      btc_delta: '+0.006110713914706655',
      usd_delta: '-50.0',
      created_at: '2018-05-17T18:43:31.235Z'
    }];
    const state = transactions(INIT_STATE, fetchSuccess(payload));

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toBeNull();
    expect(state.records).toEqual(payload);
  });

  it('проверка экшена fetchFailure', () => {
    const payload = { message: 'error' };
    const state = transactions(INIT_STATE, fetchFailure(payload));

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toEqual(payload);
    expect(state.records).toBeNull();
  });
});
