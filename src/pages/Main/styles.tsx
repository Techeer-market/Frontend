import styled from 'styled-components';
export const MainContainer = styled.div``;
export const MainDiv = styled.div``;
export const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;
export const KorText = styled.h3`
  font-weight: 700;
  font-size: 2.5rem;
  @media only screen and (max-width: 1400px) {
    font-size: 2rem;
    white-space: nowrap;
  }
`;
export const TextLine = styled.div`
  width: 97rem;
  height: 0px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-left: 6.5rem;
`;
export const ProductDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(1, minmax(5px, auto));
  grid-template-rows: repeat(5, 1fr);
`;
