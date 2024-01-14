import styled from 'styled-components';

export const Tabs = styled.ul`
  display: flex;
  padding: 6.2rem 2rem 0;
  list-style: none;
  cursor: pointer;
`;

export const Tab = styled.li<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: ${(props) => (props.isActive ? '2px solid #000' : '1.5px solid #D9D9D9')};
  color: ${(props) => (props.isActive ? '#000' : ' #7A7676')};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

export const TabContent = styled.div`
  padding: 2rem 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyList = styled.div`
  padding-top: 2rem;
  text-align: center;
  color: #828385;
`;
