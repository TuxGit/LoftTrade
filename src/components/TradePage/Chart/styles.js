import styled from 'styled-components';

export const ButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #edf0f1;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Button = styled.button`
  margin: 0 4px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: transparent;
  color: #9998A1;
  padding: 2px 16px;
`;

export const ActiveButton = Button.extend`
  background-color: #6AB4DD;
  color: white;
`;
