import styled from 'styled-components';

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
`;

export const Button = styled.button`
  margin: 10px 0;
  background-color: #4db6e2;
  color: #fff;
  border: none;
  font-size: 22px;
  padding: 12px 0;
  font-weight: 300;
  letter-spacing: 1.1px;
  cursor: pointer;
`;

export const ErrorMessage = styled.p`
  color: red;
`;
