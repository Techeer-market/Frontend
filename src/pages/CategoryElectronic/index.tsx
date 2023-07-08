import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import styled from 'styled-components';
import axios from 'axios';

const CategoryElectronic: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);

  interface Product {
    productUuid: string;
    title: string;
    image_url_1: string;
    tradeType: 'CoolDeal' | 'GeneralDeal';
    price: number;
  }

  const tradeTypeMap = {
    CoolDeal: '쿨거래',
    GeneralDeal: '일반거래',
  };

  const getItems = useCallback(async () => {
    try {
      const res = await axios.get(`http://54.180.142.116:8080/api/products/category/list/339884f8-50de-429a-9f3b-543342609b21`);
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return (
    <MainDiv>
      <NavBar />
      <Wrap>
        <CategoryName>Electronic Products</CategoryName>
        <MainContainer className="list">
          <Section1>
            <HeaderText>Registered Products</HeaderText>
            <KorText>등록 상품</KorText>
            <ProductDiv>
              {items && items.map((item) => (
                <Div key={item.productUuid}>
                  <Image style={{ backgroundImage: `url(${item.image_url_1})` }} />
                  <TextDiv>
                    <Title>{item.title}</Title>
                    <TwoWrap>
                      {tradeTypeMap.hasOwnProperty(item.tradeType) && (
                        <TradeType>{tradeTypeMap[item.tradeType]}</TradeType>
                      )}
                      <Seller>(임성한)</Seller>
                    </TwoWrap>
                    <Price>{item.price}원</Price>
                  </TextDiv>
                </Div>
              ))}
            </ProductDiv>
          </Section1>
        </MainContainer>
      </Wrap>
    </MainDiv>
  );
};

export default CategoryElectronic;

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
  background-color: rgb(255, 199, 0);
  padding: 0.4rem 1.5rem;
  color: black;
  margin: 3rem 0 2rem;
  font-weight: 700;
  font-size: 2.4rem;
  border-radius: 17px;
  line-height: 4.1rem;
  box-shadow: 0 4px 4px 0 rgba(166, 133, 133, 0.25);
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const Section1 = styled.div`
  margin-bottom: 2rem;
  width: 92.68rem;
`;
const ProductDiv = styled.div`
  display: grid;
  width: 15rem;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 15px;
  justify-content: space-between;
`;
const Div = styled.div`
  margin-right: 3.41rem;
  margin-bottom: 4rem;;
  display: flex;
  flex-direction: column;
`;
const Text1 = styled.div`
  font-weight: 700;
  font-size: 1.7rem;
`
const HeaderText = styled(Text1)`
  font-size: 2rem;
  padding-top: 2rem;
`;
const KorText = styled.div`
  font-size: 1.5rem;
  padding-bottom: 2rem;
  margin: 0.3rem 0 2rem;
  border-bottom: 0.07rem solid rgb(0, 0, 0);
`;
const Image = styled.div`
  width: 15rem;
  height: 18rem;
  margin-bottom: 0.6rem;
  background-color: #000;
  cursor: pointer;
`;
const TextDiv = styled.div`
  line-height: 2.2rem;
  max-width: 15rem;
`;
const Title = styled(Text1)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;
const Price = styled(Text1)`
`;
const TwoWrap = styled.div`
  display: flex;
  flex-direction: row;
`
const TradeType = styled.div`
  color: #000;
  margin-right: 1rem;
  font-size: 1.3rem;
`;
const Seller = styled.div`
  color: #D9D9D9;
  font-size: 1.3rem;
`;