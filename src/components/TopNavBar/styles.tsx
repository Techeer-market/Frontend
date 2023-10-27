import styled from 'styled-components';

export const BarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 7.4rem;
    background: #FFF;
`

export const ClickArea = styled.div`
    width: 25px;
    heigth: 25px;
    &:hover {
        cursor: pointer;
        color: #828385;
    }
`

export const NavText = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  padding-left: 20px;
  color: #000000;
`;