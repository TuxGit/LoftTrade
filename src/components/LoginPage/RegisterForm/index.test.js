import React from 'react';
import { shallow } from 'enzyme';

import { RegisterForm } from './index';
import * as styled from './styles';

describe('Компонента RegisterForm', () => {
  describe('Содержит методы:', () => {
    const wrapper = shallow(<RegisterForm />);

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
    const wrapper = shallow(<RegisterForm />);

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
      expect(wrapper.find(styled.Button)).toHaveLength(1);
    });
  });

  describe('Проверка вёрстки с ошибкой:', () => {
    const error = { message: {email: ['err email']} };
    const wrapper = shallow(<RegisterForm error={error} />);

    it('блок для ошибки', () => {
      expect(wrapper.find(styled.ErrorMessage)).toHaveLength(1);
    });
  });

  describe('Поведение:', () => {
    const submitForm = jest.fn();
    const wrapper = shallow(<RegisterForm submitForm={submitForm} />);

    it('нажатие на кнопку', () => {
      wrapper.find(styled.Button).simulate('click');
      expect(submitForm).toHaveBeenCalledTimes(1);
    });

    it('изменение email', () => {
      wrapper.find('Input[name="email"]').simulate('change', {target: {value: 'test@mail', name: 'email'}});
      expect(wrapper.state()).toEqual({ email: 'test@mail', password: '' });
    });

    it('изменение password', () => {
      wrapper.find('Input[name="password"]').simulate('change', {target: {value: '123', name: 'password'}});
      expect(wrapper.state()).toEqual({ email: 'test@mail', password: '123' });
    });
  });
});
