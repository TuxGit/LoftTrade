import currency, {
  selectOffset, selectBtc, selectEth,
  fetchBtcRequest, fetchBtcSuccess, fetchBtcFailure,
  fetchEthRequest, fetchEthSuccess, fetchEthFailure
} from './currency';

const INIT_STATE = {
  selected: 'btc',
  offset: '8h',
  btc: [],
  eth: [],
  isBtcFetching: false,
  isEthFetching: false
};

describe('Тестирование редьюсера currency', () => {
  it('инициализация State', () => {
    const state0 = currency(undefined, { type: '@@TEST/INIT' });

    expect(state0).toEqual(INIT_STATE);
  });

  it('проверка экшена selectOffset', () => {
    const state = currency(INIT_STATE, selectOffset('4h'));

    expect(state.offset).toBe('4h');
  });

  it('проверка экшена selectBtc', () => {
    const state = currency(INIT_STATE, selectBtc());

    expect(state.selected).toEqual('btc');
  });

  it('проверка экшена selectEth', () => {
    const state = currency(INIT_STATE, selectEth());

    expect(state.selected).toEqual('eth');
  });

  it('проверка экшена fetchBtcRequest', () => {
    const state = currency(INIT_STATE, fetchBtcRequest('8h'));

    expect(state.isBtcFetching).toBeTruthy();
  });

  it('проверка экшена fetchBtcSuccess', () => {
    const payload = [{
      mts: 1526586840000,
      sell: 8167.7,
      purchase: 8086.023
    }];
    const state = currency(INIT_STATE, fetchBtcSuccess(payload));

    expect(state.isBtcFetching).toBeFalsy();
    expect(state.btc).toEqual(payload);
  });

  it('проверка экшена fetchBtcFailure', () => {
    const state = currency(INIT_STATE, fetchBtcFailure());

    expect(state.isBtcFetching).toBeFalsy();
    expect(state.btc).toEqual([]);
  });

  it('проверка экшена fetchEthRequest', () => {
    const state = currency(INIT_STATE, fetchEthRequest('8h'));

    expect(state.isEthFetching).toBeTruthy();
  });

  it('проверка экшена fetchEthSuccess', () => {
    const payload = [{
      mts: 1526586780000,
      sell: 683.645,
      purchase: 676.80855
    }];
    const state = currency(INIT_STATE, fetchEthSuccess(payload));

    expect(state.isEthFetching).toBeFalsy();
    expect(state.eth).toEqual(payload);
  });

  it('проверка экшена fetchEthFailure', () => {
    const state = currency(INIT_STATE, fetchEthFailure());

    expect(state.isEthFetching).toBeFalsy();
    expect(state.eth).toEqual([]);
  });
});
