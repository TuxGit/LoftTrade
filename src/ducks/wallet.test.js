import wallet, {
  fetchRequest, fetchSuccess, fetchFailure,
  buyCurrencyRequest, buyCurrencySuccess, buyCurrencyFailure,
  sellCurrencyRequest, sellCurrencySuccess, sellCurrencyFailure
} from './wallet';

const INIT_STATE = {
  isFetching: false,
  error: null,
  exchangeError: null,
  coins: null
};

describe('Тестирование редьюсера wallet', () => {
  it('инициализация State', () => {
    const state0 = wallet(undefined, { type: '@@TEST/INIT' });

    expect(state0).toEqual(INIT_STATE);
  });

  it('проверка экшена fetchRequest', () => {
    const state = wallet(INIT_STATE, fetchRequest());

    expect(state.isFetching).toBeTruthy();
    expect(state.error).toBeNull();
    expect(state.coins).toBeNull();
  });

  it('проверка экшена fetchSuccess', () => {
    const payload = {
      btc: 0.96385146729036,
      eth: 1.65644369503928,
      usd: 34.2968491299496
    };
    const state = wallet(INIT_STATE, fetchSuccess(payload));

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toBeNull();
    expect(state.coins).toEqual(payload);
  });

  it('проверка экшена fetchFailure', () => {
    const payload = { message: 'error' };
    const state = wallet(INIT_STATE, fetchFailure(payload));

    expect(state.isFetching).toBeFalsy();
    expect(state.error).toEqual(payload);
    expect(state.coins).toBeNull();
  });

  // operations (buy and sell)
  it('проверка экшена buyCurrencyRequest', () => {
    const payload = { selectedCurrency: 'btc', value: 0.1 };
    const state = wallet(INIT_STATE, buyCurrencyRequest(payload));

    expect(state.exchangeError).toBeNull();
  });

  it('проверка экшена buyCurrencySuccess', () => {
    const payload = {
      usd: 35.2868491299496,
      btc: 0.9637290143123035,
      eth: 1.65644369503928
    };
    const state = wallet(INIT_STATE, buyCurrencySuccess(payload));

    expect(state.coins).toEqual(payload);
  });

  it('проверка экшена buyCurrencyFailure', () => {
    const payload = { message: 'error' };
    const state = wallet(INIT_STATE, buyCurrencyFailure(payload));

    expect(state.exchangeError).toEqual(payload);
  });

  it('проверка экшена sellCurrencyRequest', () => {
    const payload = { selectedCurrency: 'btc', value: 0.1 };
    const state = wallet(INIT_STATE, sellCurrencyRequest(payload));

    expect(state.exchangeError).toBeNull();
  });

  it('проверка экшена sellCurrencySuccess', () => {
    const payload = {
      usd: 35.2868491299496,
      btc: 0.9637290143123035,
      eth: 1.65644369503928
    };
    const state = wallet(INIT_STATE, sellCurrencySuccess(payload));

    expect(state.coins).toEqual(payload);
  });

  it('проверка экшена sellCurrencyFailure', () => {
    const payload = { message: 'error' };
    const state = wallet(INIT_STATE, sellCurrencyFailure(payload));

    expect(state.exchangeError).toEqual(payload);
  });
});
