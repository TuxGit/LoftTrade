import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Particles from 'react-particles-js';

import particlesConfig from '../../particles-params';
import { loginRequest, registrationRequest, getIsAuthorized } from '../../ducks/auth';
// import Input from './Input';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
// import Styles from './styles';
import LogoSvg from './logo.svg';
import { Container, Content, Logo, FormWrapper, FormSwitcher } from './styles';

class LoginPage extends PureComponent {
  state = {
    mode: 'login' // register
  }

  // onChangeHandler = (e) => {
  //   const field = e.target.name;
  //   const value = e.target.value;

  //   this.setState({ [field]: value });
  // }

  // onKeyPressHandler = (e) => {
  //   if (e.key === 'Enter') {
  //     this.props.loginRequest(this.state.authToken);
  //   }
  // }

  submitFormHandler = (params) => {
    // console.log('submit', params);

    const { email, password } = params;
    // todo - validate params

    if (this.state.mode === 'login') {
      this.props.loginRequest({ email, password });
    } else {
      this.props.registrationRequest({ email, password });
    }
  }

  onClickSwitchMode = (e) => {
    e.preventDefault();
    const mode = e.target.dataset.mode;

    if (mode) {
      this.setState({ mode });
    }
  }

  render () {
    const { mode } = this.state;
    const { isAuthorized } = this.props;

    if (isAuthorized) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <Container>
          <Content>
            <Logo src={LogoSvg} />
            <FormWrapper>
              {
                mode === 'login'
                  ? <LoginForm submitForm={this.submitFormHandler} />
                  : <RegisterForm submitForm={this.submitFormHandler} />
              }
            </FormWrapper>
            <FormSwitcher>
              {
                mode === 'login'
                  ? <p>Впервые на сайте? <a href="" data-mode="register" onClick={this.onClickSwitchMode}>Регистрация</a></p>
                  : <p>Уже зарегистрированы? <a href="" data-mode="login" onClick={this.onClickSwitchMode}>Войти</a></p>
              }
            </FormSwitcher>
          </Content>
        </Container>
        <Particles width="100%" height="100vh" params={particlesConfig} />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    isAuthorized: getIsAuthorized(state)
  }),
  { loginRequest, registrationRequest }
)(LoginPage);
