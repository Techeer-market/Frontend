import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

const index = () => {
  return (
    <ProductDiv>
      <ImageDiv></ImageDiv>
      <TextDiv>
        <TitleDiv>자바프로그래밍</TitleDiv>
        <PriceDiv>500만원</PriceDiv>
      </TextDiv>
    </ProductDiv>
  );
};

const ProductDiv = styled.div`
  margin-right: 10px;
  margin-bottom: 15px;
`;
const ImageDiv = styled.div`
  width: 25rem;
  height: 26.5rem;
  background-color: #000;
  & {
    cursor: pointer;
  }
`;
const TextDiv = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 29px;
`;
const TitleDiv = styled.span``;
const PriceDiv = styled.span``;
export default index;
