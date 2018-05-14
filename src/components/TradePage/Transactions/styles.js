import styled from 'styled-components';

export const Table = styled.table`
  margin: 40px 0;
  width: 100%;
  text-align: right;
  border: 1px solid #edf0f1;
  border-collapse: collapse;
  border-radius: 3px;
`;

export const Tr = styled.tr`
  border: 1px solid #edf0f1;
`;

export const TrHead = Tr.extend`
  background-color: #edf0f1;
  /* border: 1px solid #edf0f1; */
`;

export const Th = styled.th`
  border: 1px solid #edf0f1;
  padding: 5px 10px;
`;

export const Td = styled.td`
  border: 1px solid #edf0f1;
  padding: 5px 10px;
`;
