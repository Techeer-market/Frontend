import React from 'react';
import NavBar from '@/components/NavBar';
import ProductList from '@/components/ProductList';
import styled from 'styled-components';

const index = () => {
  return (
    <MainDiv>
      <NavBar />
      <MainContainer>
        <TextDiv>
          <KorText>방금 올라온 상품이에요 !</KorText>
          <TextLine />
        </TextDiv>
        <ProductDiv>
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
          <ProductList />
        </ProductDiv>
      </MainContainer>
    </MainDiv>
  );
};
const MainDiv = styled.div``;
const MainContainer = styled.div``;
const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;
const KorText = styled.h3`
  font-weight: 700;
  font-size: 2.5rem;
  @media only screen and (max-width: 1400px) {
    font-size: 2rem;
    white-space: nowrap;
  }
`;
const TextLine = styled.div`
  width: 97rem;
  height: 0px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-left: 6.5rem;
`;
const ProductDiv = styled.div`
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(5, minmax(5px, auto));
  grid-template-rows: repeat(5, 1fr);
`;

export default index;
