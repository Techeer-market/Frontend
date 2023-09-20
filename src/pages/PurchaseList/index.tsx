import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';

interface Item {
  title: string;
  price: number;
  image: string;
}

const PurchaseList: React.FC  = () => {
    const { userId } = useParams(); // 유저 아이디를 URL 파라미터에서 가져옵니다.
    const [items, setItems] = useState<Item[]>([]); // 구매 내역을 저장할 상태 변수
    
    const fetchPurchaseList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/purchase-products`);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchPurchaseList();
    }, []);

  return (
    <MainDiv>
      <NavBar />
      <Title>구매리스트</Title>
      <MainContainer className="list">
        <Section1>
          <HeaderText>Registered Product</HeaderText>
          <KorText>판매 중</KorText>
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
    </MainDiv>
  );
};

export default PurchaseList;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 6rem;
    padding-bottom: 6rem;
    border-bottom: 0.07rem solid #000000;
    width: 92.68rem;

    font-size: 3rem;
    line-height: 4.1rem;
    font-weight: bold;
    /* identical to box height */
    color: #000000;
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