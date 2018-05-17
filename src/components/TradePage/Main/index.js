import React, { PureComponent } from 'react';

import Wallet from '../Wallet';
import Chart from '../Chart';
import Transactions from '../Transactions';
import TradeOperations from '../TradeOperations';
import { Container, Content, SidebarSection, MainSection } from './styles';

class Main extends PureComponent {
  render () {
    return (
      <Container>
        <Content>
          <SidebarSection>
            <Wallet />
            <TradeOperations />
          </SidebarSection>
          <MainSection>
            <Chart />
            <Transactions />
          </MainSection>
        </Content>
      </Container>
    );
  }
}

export default Main;
