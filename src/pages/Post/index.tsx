import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import styled from 'styled-components';
import axios from 'axios';

const Post: React.FC = () => {
  const { productUuid } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');  // 메인 이미지 URL을 저장(마우스대면사진바꿔보이도록)

  const tradeTypeMap = { //랜더링할 때 한글로 랜더링
    CoolDeal: '쿨거래',
    GeneralDeal: '일반거래',
  };

useEffect(() => {
    const getProduct = async () => { //get 메서드로 상세페이지 요청
      try {
        const response = await axios.get(`http://54.180.142.116:8080/api/products/list/${productUuid}`);
        const productData = response.data;
        setProduct(response.data);
        setMainImage(productData.image_url_1); //메인 이미지를 설정
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [productUuid]);

  if (!product) {
    return null;
  }
//Container전체안에 NavBar네비바와 Wrap본문으로 구성
//Wrap본문 안에 Title페이지제목, Wrapper상세정보란,Description상품글정보란,ReturnButton판매리스트로돌아가기버튼으로 구성됨
//Wrapper상세정보란안에는 Image첫번째메인이미지와 Details(상품명,카테고리,나머지이미지 등)을 양옆 가로로 배치
//Details는 ProductTitle상품명 Price가격 TypeWrapper(세요소묶음) ImagesWrapper(나머지이미지묶음) Buttons1(두 버튼묶음)로 구성되어 있고, 세로로 정렬
//TypeWrapper는 Category카테고리유형 TradeType거래타입 Date작성일을 양옆 채워 가로로 나란히 정렬
//ImagesWrapper ImageItem 3개(메인 제외한 이미지 셋)를 양옆 채워 가로로 나란히 정렬
//Buttons1 ChatButton채팅가기 WishlistButton위시리스트 두 버튼을 양옆 채워 가로로 나란히 정렬
//ReturnButton은 홈화면가는 버튼 뒤로가기버튼으로 수정필요하다면 권장
  return (
    <Container>
      <NavBar />
      <Wrap>
      <Title>판매 상품</Title>
      <Wrapper>
        <Image>
          {product && <img src={mainImage} alt="Product" style={{ width: '40rem', height: '40rem' }} />}
        </Image>
        <Details>
          <ProductTitle>{product.title}</ProductTitle>
          <Price>{product.price}원</Price>
          <TypeWrapper>
            <Category>{product.categoryName}</Category>
            {tradeTypeMap.hasOwnProperty(product.tradeType) && (
             <TradeType>{tradeTypeMap[product.tradeType]}</TradeType>)}
             {/* 기능으로 구현하기 필수!!!!수정필수!! */}
             <Date>2023/06/28</Date>
          </TypeWrapper>
          <ImagesWrapper>
            {product.image_url_2 && (
              <ImageItem src={product.image_url_2} alt="Product"
                onMouseOver={() => setMainImage(product.image_url_2)}
                onMouseOut={() => setMainImage(product.image_url_1)}
              />
            )}
            {product.image_url_3 && (
              <ImageItem src={product.image_url_3} alt="Product"
                onMouseOver={() => setMainImage(product.image_url_3)}
                onMouseOut={() => setMainImage(product.image_url_1)}
              />
            )}
            {product.image_url_4 && (
              <ImageItem
                src={product.image_url_4} alt="Product" 
                onMouseOver={() => setMainImage(product.image_url_4)}
                onMouseOut={() => setMainImage(product.image_url_1)}
              />
            )}
          </ImagesWrapper>
          <Buttons1>
            <ChatButton onClick={() => (window.location.href = "/chat")}>채팅가기</ChatButton>
            <WishlistButton onClick={() => (window.location.href = "/wishtlist")}>위시리스트 +</WishlistButton>
          </Buttons1>
        </Details>
      </Wrapper>
      <Description>
        <SubTitle>상품 설명</SubTitle>
        <Content>{product.description}</Content>
      </Description>
      {/* 아래 주석 처리한 두 요소는 추후 작성자와 타인 구별하는 기능이 추가되면 작성자에게만 수정버튼이 보이도록 구현해야하므로 놔둠 필요시 사용권장!*/}
      {/* <Buttons2>
        <EditButton onClick={() => (window.location.href = "/edit")}>게시글 수정</EditButton> */}
        <ReturnButton onClick={() => (window.location.href = "/")}>홈화면</ReturnButton>
      {/* </Buttons2> */}
      </Wrap>
    </Container>
  );
};
export default Post;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family:"LINESeedKRBd";
    font-style: normal;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3.5rem;
    padding-bottom: 6rem;
    border-bottom: 0.07rem solid #000000; //줄 긋기
    width: 92.68rem;
    font-size: 3rem;
    line-height: 4.1rem;
    font-weight: bold;
    color: #000000;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
`;
const Image = styled.div`
  width: 40rem;
  height: 40rem;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  width: 40rem;
  height: 40rem;
`;
const ProductTitle = styled.h2`
  font-size: 2.2rem;
  margin-top: 1.25rem;
  font-weight: bold;
`;
const Price = styled.h3`
  font-size: 3.4rem;
  margin-top: 1.5rem;
  font-weight: bold;
`;
const TypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1.8rem;
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 0.07rem solid #000000;
`;
const Category = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
  color: #646464;
  margin-right: 1rem;
`;
const TradeType = styled.h3`
  font-size: 1.5rem;
  width: 8rem;
  height: 3rem;
  background-color: #000;
  color: #FFF;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-right: 6rem;
  font-weight: bold;
`;
const Date = styled.h3`
  font-size: 1.5rem;
  text-align: right;
  margin-top: 1rem;
  color: #222;
`;
const ImagesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 13rem;
  gap: 0.5rem;
  margin-top: 3.2rem;
  margin-bottom: 3.2rem;
`;
const Buttons1 = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;
const ChatButton = styled.button`
  font-size: 2rem;
  font-weight: bold;
  width: 20rem;
  height: 5rem;
  border: none;
  border-radius: 10px;
  &:hover { //마우스 대면 색반전
    background-color: #000;
    color: #fff;
  }
`;
const WishlistButton = styled.button`
  font-size: 2rem;
  font-weight: bold;
  width: 20rem;
  height: 5rem;
  border: none;
  border-radius: 10px;
  &:hover { //마우스 대면 색반전
    background-color: #000;
    color: #fff;
  }
`;
const Description = styled.p`
  width: 92.68rem;
  height: 26rem;
  padding: 2.6rem 0 0 2.6rem;
  border-top: 0.07rem solid #000000;
  border-bottom: 0.07rem solid #000000;
  margin-bottom: 1.25rem;
`;
const SubTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
const Content = styled.h4`
  font-size: 1.8rem;
`;
const ImageItem = styled.img`
  width: 13rem;
  height: 13rem;
  border-radius: 0.5rem;
  object-fit: cover;

  &:hover { //마우스 대면 밝기 낮춰짐
    filter: brightness(70%);
  }
  
`;
// const Buttons2 = styled.div`
//     margin-bottom: 20rem;
// `;
// const EditButton = styled.button`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     width: 92.47rem;
//     height: 4.2rem;
//     left: 29.27rem;
//     top: 160rem;
//     color: #FFFFFF;
//     background: #000000;
//     border-radius: 10px;
//     margin-bottom: 1.25rem;
//     border: none;
//     cursor: pointer;
//     font-size: 2.5rem;
//     line-height: 4.1rem;
// `;
const ReturnButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92.47rem;
    height: 4.2rem;
    left: 29.27rem;
    top: 167.6rem;
    /* background: #EFEFEF; */
    color: #FFFFFF;
    background: #000000;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-size: 2.5rem;
    line-height: 4.1rem;
    margin-bottom: 5rem;
`;