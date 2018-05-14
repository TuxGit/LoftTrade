import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100% - 80px);
  margin-bottom: -100px;
  background-color: #F2F3F5;

  &::after {
    content: '';
    display: block;
    height: 100px;
  }
`;

export const Content = styled.div`
  width: 1200px;
  padding-top: 10px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const SidebarSection = styled.section`
  width: 450px;
`;

export const MainSection = styled.section``;
