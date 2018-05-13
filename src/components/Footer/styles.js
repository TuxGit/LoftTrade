import styled from 'styled-components';

export const Container = styled.footer`
  align-items: center;
  background-color: #1f2022;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 100;
  height: 100px;
  justify-content: center;
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;

  p {
    line-height: 1.4;
    width: 230px;
  }

  a {
    border-bottom: 1px solid white;
    color: white;
    font-weight: 500;
  }
`;

export const LogoImg = styled.img`
  width: 180px;
`;
