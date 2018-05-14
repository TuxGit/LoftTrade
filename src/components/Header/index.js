import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { selectBtc, selectEth } from '../../ducks/currency';
import LogoWhiteSvg from './Logo-white.svg';
import { Container, Content, Logo, Menu, MenuItem, UserInfo } from './styles';

export class Header extends Component { // PureComponent -> нет реакции на переходы по ссылкам меню
  // componentDidMount () {
  //   this.props.fetchUserRequest();
  // }

  onClickNavLink = param => e => {
    // console.log(this.props.selectEth(), selectEth());

    if (param === 'btc') {
      this.props.selectBtc();
    } else if (param === 'eth') {
      this.props.selectEth();
    }
  }

  render () {
    // console.log(this.props);
    const { user, btc, eth } = this.props;

    const btcContent = btc ? btc.sell.toFixed(1) : 0;
    const ethContent = eth ? eth.sell.toFixed(1) : 0;
    const userInfoContent = user && (<span data-id={user.id}>{user.email}</span>);

    return (
      <Container>
        <Content>
          <Logo src={LogoWhiteSvg} alt="Logo" />
          <Menu>
            <MenuItem>
              <NavLink to="/trade/btc" onClick={this.onClickNavLink('btc')} >
                { btcContent }
                <b>1 BTC</b>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/trade/eth" onClick={this.onClickNavLink('eth')}>
                { ethContent }
                <b>1 ETH</b>
              </NavLink>
            </MenuItem>
          </Menu>
          <UserInfo>
            { userInfoContent }
          </UserInfo>
        </Content>
      </Container>
    );
  }
}

// export default Header;
// export default withRouter(Header);
export default connect(
  state => ({
    // isAuthorized: getIsAuthorized(state)
    // user: null
  }),
  { selectBtc, selectEth }
)(Header);
