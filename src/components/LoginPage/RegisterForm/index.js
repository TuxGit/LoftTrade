import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { registrationRequest, getRegistrationError } from '../../../ducks/auth';
import Input from '../Input';
import { Form, Button, ErrorMessage } from './styles';

export class RegisterForm extends PureComponent {
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
      this.props.submitForm(this.state);
    }
  }

  onClickHandler = () => {
    this.props.submitForm(this.state);
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

        { error && Object.keys(error.message).map(key =>
          <ErrorMessage key={key}>{key}: {error.message[key].join(' ')}</ErrorMessage>)
        }

        <Button onClick={this.onClickHandler}>Зарегистрироваться</Button>
      </Form>
    );
  }
}

export default connect(
  state => ({
    error: getRegistrationError(state)
  }),
  { registrationRequest }
)(RegisterForm);
