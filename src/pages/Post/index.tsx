import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import styled from 'styled-components';
import axios from 'axios';

const Post: React.FC = () => {
  const { productUuid } = useParams();
  const [product, setProduct] = useState(null);

  const tradeTypeMap = {
    CoolDeal: '쿨거래',
    GeneralDeal: '일반거래',
  };

useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`http://54.180.142.116:8080/api/products/list/${productUuid}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [productUuid]);

  if (!product) {
    return null;
  }

  return (
    <Container>
      <NavBar />
      <Wrap>
      <Title>판매 상품</Title>
      <Wrapper>
        <Image>
        {product && <img src={product.image_url_1} alt="Product" style={{ width: '40rem', height: '40rem' }} />}
        </Image>
        <Details>
          <ProductTitle>{product.title}</ProductTitle>
          <Price>{product.price}원</Price>
          <TypeWrapper>
            <Category>{product.categoryName}</Category>
            {tradeTypeMap.hasOwnProperty(product.tradeType) && (
             <TradeType>{tradeTypeMap[product.tradeType]}</TradeType>)}
             <Date>작성일 : 2023/06/28</Date>
          </TypeWrapper>
          <ImagesWrapper>
            {product.image_url_2 && <ImageItem src={product.image_url_2} alt="Product" />}
            {product.image_url_3 && <ImageItem src={product.image_url_3} alt="Product" />}
            {product.image_url_4 && <ImageItem src={product.image_url_4} alt="Product" />}
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
    border-bottom: 0.07rem solid #000000;
    width: 92.68rem;
    font-size: 3rem;
    line-height: 4.1rem;
    font-weight: bold;
    /* identical to box height */
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
  &:hover {
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
  &:hover {
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
`;