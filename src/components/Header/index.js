import React, { PureComponent, Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import LogoWhiteSvg from './Logo-white.svg';
import { Container, Content, Logo, Menu, MenuItem, UserInfo } from './styles';

export class Header extends Component { // PureComponent -> нет реакции на переходы по ссылкам меню
  // componentDidMount () {
  //   this.props.fetchUserRequest();
  // }

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
              <NavLink to="/trade/btc">
                { btcContent }
                <b>1 BTC</b>
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to="/trade/eth">
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

export default Header;
// export default withRouter(Header);
// export default connect(
//   state => ({
//     // isAuthorized: getIsAuthorized(state)
//     user: null
//   }),
//   { logout }
// )(Header);
