import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  width: 50rem;
  height: 100vh;
  img {
    cursor: pointer;
  }
`;
export const ProductContainer = styled.div`
  padding: 3rem 2rem 0;
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  padding-left: 50px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 120px 120px 120px;
  grid-template-rows: 160px 160px 160px;
  gap: 5px;
  align-items: center;
  place-content: center;
  img {
    cursor: pointer;
  }
  margin-top: 8vw;
  @media (min-width: 1024px) {
    margin-top: 120px;
  }
`;

export const Item = styled.div`
  width: 80px;
  height: 100px;
  align-items: center;
  place-content: center;
`;
export const Text = styled.h3`
  display: flex;
  place-content: center;
  align-items: center;
  margin-top: 10px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
`;

export const Foot = styled.div``;
export const EmptyList = styled.div`
  padding-top: 2rem;
  text-align: center;
  color: #828385;
`;
