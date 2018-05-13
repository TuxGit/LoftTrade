import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2b2c2e;
  height: 80px;
  color: #fff;
`;

export const Content = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.img`
  width: 180px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MenuItem = styled.span`
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 80px;
    justify-content: center;
    margin: 0 8px;
    text-decoration: none;
    cursor: pointer;
    color: white;
  }

  a.active {
    cursor: auto;
    color: #aaa;
  }
`;

export const UserInfo = styled.div`

`;
