import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { loginRequest, getLoginError } from '../../../ducks/auth';
import Input from '../Input';
import { Form, Button, ErrorMessage } from './styles';

class LoginForm extends PureComponent {
  state = {
    email: '',
    password: ''
  }

  onChangeHandler = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    this.setState({ [field]: value });
  }

  onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      this.props.loginRequest(this.state);
    }
  }

  onClickHandler = () => {
    this.props.loginRequest(this.state);
  }

  render () {
    const { email, password } = this.state;
    const { error } = this.props;

    return (
      <Form>
        <Input
          type="email"
          value={email}
          name="email"
          placeholder="email"
          icon="icon-user"
          onKeyPress={this.onKeyPressHandler}
          onChange={this.onChangeHandler} />

        <Input
          type="password"
          value={password}
          name="password"
          placeholder="password"
          icon="icon-pass"
          onKeyPress={this.onKeyPressHandler}
          onChange={this.onChangeHandler} />

        { error && <ErrorMessage>{error.message}</ErrorMessage> }

        <Button onClick={this.onClickHandler}>Войти</Button>
      </Form>
    );
  }
}

export default connect(
  state => ({
    error: getLoginError(state)
  }),
  { loginRequest }
)(LoginForm);
