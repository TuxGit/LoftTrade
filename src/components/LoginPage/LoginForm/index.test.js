import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './index';
import * as styled from './styles';

describe('Компонента LoginForm', () => {
  describe('Содержит методы:', () => {
    const wrapper = shallow(<LoginForm />);

    it('onChangeHandler', () => {
      expect(wrapper.instance().onChangeHandler).toBeDefined();
    });
    it('onKeyPressHandler', () => {
      expect(wrapper.instance().onKeyPressHandler).toBeDefined();
    });
    it('onClickHandler', () => {
      expect(wrapper.instance().onClickHandler).toBeDefined();
    });
  });

  describe('Проверка вёрстки без ошибок:', () => {
    const wrapper = shallow(<LoginForm />);

    it('форма', () => {
      expect(wrapper.find(styled.Form)).toHaveLength(1);
    });
    it('поле с логином', () => {
      expect(wrapper.find('Input[name="email"]')).toHaveLength(1);
    });
    it('поле с паролем', () => {
      expect(wrapper.find('Input[name="password"]')).toHaveLength(1);
    });
    it('блок для ошибки отсутствует', () => {
      expect(wrapper.find('ErrorMessage')).toHaveLength(0);
    });
    it('кнопка "Войти"', () => {
      // expect(wrapper.find('button')).toHaveLength(1);
      expect(wrapper.find(styled.Button)).toHaveLength(1);
    });
  });

  describe('Проверка вёрстки с ошибкой:', () => {
    const error = new Error('message');
    const wrapper = shallow(<LoginForm error={error} />);

    it('блок для ошибки', () => {
      expect(wrapper.find(styled.ErrorMessage)).toHaveLength(1);
    });
  });

  describe('Поведение:', () => {
    const loginRequest = jest.fn();
    const wrapper = shallow(<LoginForm loginRequest={loginRequest} />);

    it('нажатие на кнопку', () => {
      wrapper.find(styled.Button).simulate('click');
      expect(loginRequest).toHaveBeenCalledTimes(1);
    });

    it('изменение email', () => {
      // const input = wrapper.find('Input[name="email"]');
      wrapper.find('Input[name="email"]').simulate('change', {target: {value: 'test@mail', name: 'email'}});
      expect(wrapper.state()).toEqual({ email: 'test@mail', password: '' });
    });

    it('изменение password', () => {
      wrapper.find('Input[name="password"]').simulate('change', {target: {value: '123', name: 'password'}});
      expect(wrapper.state()).toEqual({ email: 'test@mail', password: '123' });
    });
  });
});
