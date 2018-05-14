import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';

// import { getBtcData, getEthData, getSelectedCurrency } from '../../../ducks/currency';
import Wallet from '../Wallet';
import Chart from '../Chart';
import Transactions from '../Transactions';
import TradeOperations from '../TradeOperations';
import { Container, Content, SidebarSection, MainSection } from './styles';
// import styled from 'styled-components';

class Main extends PureComponent {
  render () {
    // const { btc, eth, selectedCurrency } = this.props;

    return (
      <Container>
        <Content>
          <SidebarSection>
            <Wallet />
            <TradeOperations />
          </SidebarSection>
          <MainSection>
            {/* <Chart data={this.props[selectedCurrency]} /> */}
            <Chart />
            <Transactions />
          </MainSection>
        </Content>
      </Container>
    );
  }
}

export default Main;
// export default connect(
//   state => ({
//     btc: getBtcData(state),
//     eth: getEthData(state),
//     selectedCurency: getSelectedCurrency(state)
//   }),
//   { }
// )(Main);
