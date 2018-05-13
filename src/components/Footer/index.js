import React, { PureComponent } from 'react';

import LogoWhiteSvg from './Logo-white.svg';
import { Container, Content, LogoImg } from './styles';

class Footer extends PureComponent {
  render () {
    return (
      <Container>
        <Content>
          <p>
            Сделано с любовью и старанием на курсе «React.js» в <a href="https://loftschool.com/">Loftschool</a>. Автор работы: <b>Никитин Александр</b>.
          </p>
          <LogoImg src={LogoWhiteSvg} alt="Logo" />
        </Content>
      </Container>
    );
  }
}

export default Footer;
