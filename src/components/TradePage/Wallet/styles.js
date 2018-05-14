import styled from 'styled-components';

export const CoinContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 298px;
`;

export const CoinInput = styled.div`
  background-color: #414244;
  border: 1px solid #000;
  color: #ffffff;
  border-radius: 4px;
  padding: 6px 0;
  flex: 1 1 150px;
  margin: 5px 0;
`;

export const CoinInputInteger = styled.span`
  width: 55%;
  display: inline-block;
  text-align: right;
`;

export const CoinInputFraction = styled.span`
  color: #8a8a8a;
  max-width: 78px;
  display: inline-block;
  vertical-align: bottom;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const CoinCurrency = styled.p`
  flex: 1 1;
  text-align: left;
  margin: 15px 0 0 15px;
`;
