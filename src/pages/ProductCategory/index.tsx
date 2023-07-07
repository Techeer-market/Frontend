import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import axios, { AxiosResponse } from 'axios';

interface Product {
    // id: number; //상품 식별자
    image: string; //상품 이미지 URL
    title: string; //상품명
    // tradeType: "CoolDeal" | "GeneralDeal"; //거래 유형
    // seller: string; //판매자명
    price: number; //상품 가격
}

const PerchaseHistory: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]); //상품 데이터 관리
  const [page, setPage] = useState(1); //페이지 번호 관리
  const [loading, setLoading] = useState(false); //데이터 로딩 상태 관리
  const [ref, inView] = useInView(); //스크롤 위치 감지

  const { categoryName } = useParams<{ categoryName: string }>(); //주소 에러 해결
  const displayCategoryName = categoryName.replace("_", "/");

  //서버에서 상품 데이터 가져오는 함수 (카테고리 이름 & 페이지 번호를 쿼리 파라미터로 전달?)
  const getItems = useCallback(async () => {
    setLoading(true);
    try {
      const res: AxiosResponse = await axios.get(`http://localhost:8080/api/products/${categoryName}?page=${page}`);
      setItems((prevState) => [...prevState, ...res.data]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [page, categoryName]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <MainDiv>
      <NavBar />
      <Wrap>
      <CategoryName>{displayCategoryName}</CategoryName>
      <MainContainer className="list">
        <Section1>
          <HeaderText>Registered Product</HeaderText>
          <KorText>등록 상품</KorText>
          <ProductDiv>
            {items.map((item) => (
                <Wrapper>
                <ImageDiv style={{ backgroundImage: `url(${item.image})` }} />
                <TextDiv>
                    <TitleDiv>{item.title}</TitleDiv>
                    <PriceDiv>{item.price}원</PriceDiv>
                </TextDiv>
                </Wrapper>
            ))}
          </ProductDiv>
        </Section1>
      </MainContainer>
      </Wrap>
    </MainDiv>
  );
};

export default PerchaseHistory;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CategoryName = styled.h2`
  background-color: #FFC700;
  padding: 10px 20px;
  color: black;
  margin: 6rem 0 6rem 0;
  font-weight: 700;
  font-size: 2.5rem;
  border-radius: 17px;
  line-height: 4.1rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Section1 = styled.div`
  margin-bottom: 2rem;
  border-bottom: 0.07rem solid rgb(0, 0, 0);
  width: 92.68rem;
`;

const Section2 = styled.div`
  margin-bottom: 2rem;
  width: 92.68rem;
`;

const HeaderText = styled.h3`
  font-weight: 700;
  font-size: 2rem;
`;

const KorText = styled.h3`
  margin-bottom: 2rem;
  font-size: 1.7rem;
`;
const ProductDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-right: 10px;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageDiv = styled.div`
  width: 12rem;
  height: 12rem;
  background-color: #000;
  cursor: pointer;
`;

const TextDiv = styled.div`
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 29px;
`;

const TitleDiv = styled.div``;
const PriceDiv = styled.div``;