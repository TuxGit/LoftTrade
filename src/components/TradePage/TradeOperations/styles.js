import styled from 'styled-components';

export const Container = styled.article`
  padding-top: 40px;
`;

export const InputWrapper = styled.div`
  background-color: #f2f2f2;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  margin: 5px 0;
  width: 218px;
`;

export const Input = styled.input`
  background-color: transparent;
  border: none;
  text-align: right;
  width: 100%;
  padding: 5px 0 3px;
  padding-right: 50px;
  box-sizing: border-box;
`;

export const Currency = styled.span`
  position: absolute;
  right: 8px;
  width: 38px;
  text-align: left;
  color: #adadad;
  top: 5px;
`;

export const Button = styled.button`
  width: 100px;
  margin-left: 20px;
  border: 0;
  color: #fff;
  padding: 5px 0 3px;
  border-radius: 3px;
`;

export const ButtonSell = Button.extend`
  background-color: #cb5f58;
  &:hover {
    background-color: #ba564f;
  }
`;
export const ButtonPurchase = Button.extend`
  background-color: #69b3dc;
  &:hover {
    background-color: #63acd5;
  }
`;
