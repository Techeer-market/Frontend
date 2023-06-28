import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import styled from 'styled-components';
import axios from 'axios';

interface Post {
  categoryName: string;
  productUuid: string;
  title: string;
  description: string;
  price: number;
  productState: string;
  tradeType: string;
  views: number;
  createdDate: string;
  modifiedDate: string;
}

interface RouteParams {
  productId: string;
}

const Post: React.FC = () => {
  const { productId } = useParams<RouteParams>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [productId]);

  if (!post) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <NavBar />
      <Title>게시물 등록</Title>
      <Wrapper>
        <Image>
          <img src={post.image_1} alt="Product" />
        </Image>
        <Details>
          <ProductTitle>{post.title}</ProductTitle>
          <Price>{post.price}원</Price>
          <TypeWrapper>
            <Category>{post.categoryName}</Category>
            <TradeType>{post.tradeType}</TradeType>
          </TypeWrapper>
          <ImagesWrapper>
            <ImageItem src={post.image_1} alt="Product" />
            <ImageItem src={post.image_2} alt="Product" />
            <ImageItem src={post.image_3} alt="Product" />
          </ImagesWrapper>
          <Buttons1>
            <ChatButton onClick={() => (window.location.href = "/chat")}>채팅가기</ChatButton>
            <WishlistButton onClick={() => (window.location.href = "/wishtlist")}>위시리스트 +</WishlistButton>
          </Buttons1>
        </Details>
      </Wrapper>
      <Description>
        <SubTitle>상품 설명</SubTitle>
        {post.description}
      </Description>
      <Buttons2>
        <EditButton onClick={() => (window.location.href = "/edit")}>게시글 수정</EditButton>
        <ReturnButton onClick={() => (window.location.href = "/")}>돌아가기</ReturnButton>
      </Buttons2>
    </Container>
  );
};
      {/* <Views>조회수: {post.views}</Views>
      <CreatedDate>작성일: {post.createdDate}</CreatedDate>
      <ModifiedDate>수정일: {post.modifiedDate}</ModifiedDate> */}

export default Post;

const Container = styled.div`
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    font-family:"LINESeedKRBd";
    font-style: normal;
    font-weight: 700;
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
    color: #000000;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
`;

const Image = styled.div`
  width: 30rem;
  height: 30rem;
  border-radius: 10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h2`
  font-size: 2rem;
  margin-top: 1rem;
`;

const Price = styled.h3`
font-size: 2rem;
margin-top: 1rem;
`;

const TypeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;
  margin-top: 1rem;
`;

const Category = styled.h3`
  font-size: 1.8rem;
`;

const TradeType = styled.h3`
  font-size: 1.8rem;
`;

const ImagesWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
`;
const Buttons1 = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`;

const ChatButton = styled.button`
  width: 15rem;
  height: 3.5rem;
  border-radius: 10px;
`;

const WishlistButton = styled.button`
  width: 15rem;
  height: 3.5rem;
  border-radius: 10px;
`;
const Description = styled.p`
  font-size: 1.6rem;
  margin-top: 2rem;
`;

const SubTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
`;
const ImageItem = styled.div`
  width: 10rem;
  height: 10rem;
`;

const Buttons2 = styled.div`
    margin-bottom: 20rem;
`;
const EditButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92.47rem;
    height: 4.2rem;
    left: 29.27rem;
    top: 160rem;
    color: #FFFFFF;
    background: #000000;
    border-radius: 10px;
    margin-bottom: 1.25rem;
    border: none;
    cursor: pointer;

    font-size: 2.5rem;
    line-height: 4.1rem;
`;
const ReturnButton = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 92.47rem;
    height: 4.2rem;
    left: 29.27rem;
    top: 167.6rem;
    background: #EFEFEF;
    border-radius: 10px;
    border: none;
    cursor: pointer;

    font-size: 2.5rem;
    line-height: 4.1rem;
`;
// const Views = styled.h5`
//   font-size: 1.6rem;
//   margin-top: 1rem;
// `;

// const CreatedDate = styled.h5`
//   font-size: 1.6rem;
//   margin-top: 1rem;
// `;

// const ModifiedDate = styled.h5`
//   font-size: 1.6rem;
//   margin-top: 1rem;
// `;