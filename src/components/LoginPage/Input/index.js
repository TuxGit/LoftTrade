import React, { PureComponent } from 'react';

import Styles from './styles';

class Input extends PureComponent {
  render () {
    const { type, value, name, placeholder, onKeyPress, onChange, icon } = this.props;

    return (
      <Styles className="field" icon={icon}>
        <span className={'field__icon ' + icon} />
        <input
          className="field__input"
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
          onChange={onChange}
        />
      </Styles>
    );
  }
}

export default Input;
