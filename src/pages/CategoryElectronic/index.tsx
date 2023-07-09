import React, { useCallback, useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryElectronic: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);

  interface Product { // Product에 대한 인터페이스를 정의
    productUuid: string;
    title: string;
    image_url_1: string;
    tradeType: 'CoolDeal' | 'GeneralDeal';
    price: number;
  }

  const tradeTypeMap = { // 거래 유형에 대한 매핑을 생성
    CoolDeal: '쿨거래',
    GeneralDeal: '일반거래',
  };

  const getItems = useCallback(async () => { //아이템들 가져오는 함수를 useCallback으로
    try {
      const res = await axios.get(`http://54.180.142.116:8080/api/products/category/list/339884f8-50de-429a-9f3b-543342609b21`);
      setItems(res.data); // 가져온 데이터를 items state에 설정
    } catch (error) {
      console.log(error);
    }
  }, []);// useCallback에 빈 배열을 의존성으로 전달하여 첫 렌더링 때만 생성되도록함

  useEffect(() => { 
    getItems();
  }, [getItems]);

  //MainDiv전체 안에 NavBar와 Wrap본문으로 크게 둘로 나뉨.
  //Wrap본문 안 요소는 세로로 정렬되는데, CategoryName페이지제목, MainContainer상품리스트 둘로 구성돼있음
  //CategoryName페이지제목만 가운데 위치시키고, MainContainer상품리스트는 좌측에 붙어 세로로 정렬
  //MainContainer안에는 Section1이 있음(인기상품란이 섹션1 등록된모든상품이 섹션2였는데 아직 안만들어서 섹션1만 있음)
  //Section1 안에는 HeaderText소제목 KorText소제목번역 ProductDiv(n행5열상품묶음)이 존재
  //ProductDiv(n행5열상품묶음)에는 Div상품1개가 n행5열을 이룸.
  //Div상품1개는 Image그림 TextDiv글자묶음으로 이뤄짐
  //이때, TextDiv는 Title상품명(=게시물제목)과 TwoWrap두요소묶음과 Price가격 셋으로 구성. 셋을 세로로 정렬.
  //마지막으로 두요소묶음인 TwoWrap은 TradeType거래유형과 Seller판매자명을 가로로 정렬시키고자 묶는다.
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
              {/* items 배열, 순회하며 각 상품의 정보표시 */}
              {items && items.map((item) => (
                <Div key={item.productUuid}>
                  {/* 각 상품에 연결된 링크를 생성. 해당 범위(=PostLink태그 안의 요소) 클릭시 이동 */}
                  <PostLink to={`/post/${item.productUuid}`}>
                    <Image style={{ backgroundImage: `url(${item.image_url_1})` }} />
                    <TextDiv>
                      <Title>{item.title}</Title>
                      <TwoWrap>
                        {/* 거래타입 tradeTypeMap에 있으면 표시 */}
                        {tradeTypeMap.hasOwnProperty(item.tradeType) && (
                          <TradeType>{tradeTypeMap[item.tradeType]}</TradeType>
                        )}
                        <Seller>(이름)</Seller>
                        {/* 실명제용을 위해 임시로 만든 판매자명 자리. userUUid 써서 구현하도록 수정필요!! */}
                      </TwoWrap>
                      <Price>{item.price}원</Price>
                    </TextDiv>
                  </PostLink>
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

const PostLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

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
  background-size: cover; //원본 이미지가 요소(Image태그)에 맞게 확대or축소
  background-position: center; //이미지가 요소(Image태그)의 중앙에 위치
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