import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductList from '@/components/ProductList';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import axios, { AxiosResponse } from 'axios';

const index = () => {
  // const [items, setItems] = useState<Product[]>([]);
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [ref, inView] = useInView();

  // // 상품 타입 정의
  // interface Product {
  //   name: string;
  //   price: string;
  // }

  // // 서버에서 아이템을 가지고 오는 함수
  // const getItems = useCallback(async () => {
  //   setLoading(true);
  //   await axios
  //     .get(`http://54.180.142.116:8080/api/products/list}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setItems((prevState) => [...prevState, res.data]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setLoading(false);
  // }, []);

  // // getItems가 바뀔때마다 함수 실행
  // useEffect(() => {
  //   getItems();
  // }, []);

  // // 사용자가 마지막 요소를 보고 있고 , 로딩중이 아니라면
  // useEffect(() => {
  //   if (inView && !loading) {
  //     setPage((prevState) => prevState + 1);
  //   }
  // }, [inView, loading]);

  return (
    <MainDiv>
      <NavBar />
      <MainContainer className="list">
        <TextDiv>
          <KorText>방금 올라온 상품이에요 !</KorText>
          <TextLine />
        </TextDiv>
        <ProductDiv className="list-item">
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
  grid-template-columns: repeat(1, minmax(5px, auto));
  grid-template-rows: repeat(5, 1fr);
`;

export default index;
