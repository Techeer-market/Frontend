import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import TopNavBar from '@/components/TopNavBar';
import heartImage from '../../assets/Heart.svg';
import styled from 'styled-components';
import axios from 'axios';
import { salesResultData } from '@/mocks/api/data/salesResultData';
import Phone from '../../assets/Search.svg';

const Post: React.FC = () => {
  const { productUuid } = useParams();
  const [product, setProduct] = useState(null);

  const tradeTypeMap = {
    CoolDeal: '쿨거래',
    GeneralDeal: '일반거래',
  };

  // useEffect(() => {
  // const getProduct = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/api/products/${productUuid}`);
  //     setProduct(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // getProduct();
  // }, [productUuid]);

  // if (!product) {
  //   return null;
  // }

  return (
    <S.Container>
      <S.Maincontainer>
        <S.Wrap>
          <TopNavBar page="" />

          <S.Image>
            {product && (
              <img
                //src={product.image_url_1}
                alt="Product"
                style={{ width: '40rem', height: '40rem' }}
              />
            )}
            이미지
          </S.Image>
          <S.ImagesWrapper>1</S.ImagesWrapper>

          <S.Details>
            <S.TypeWrapper>
              <S.NameAndDateWrapper>
                <label htmlFor="Profile">
                  <S.ChangeName src={heartImage} alt="Profile" />
                </label>
                <div>
                  <S.Name>name</S.Name>
                  <S.Date>date</S.Date>
                </div>
              </S.NameAndDateWrapper>
              <S.Category>디지털기기</S.Category>
            </S.TypeWrapper>
            <S.ProductTitle>productUuid</S.ProductTitle>
          </S.Details>
          <S.Description>
            <S.SubTitle>상품 설명</S.SubTitle>
            <S.Content>설명란</S.Content>
          </S.Description>

          <S.Buttons>
            <S.WishlistButton></S.WishlistButton>
            <S.Price> price </S.Price>
            <S.ChatButton onClick={() => (window.location.href = '/chat')}>채팅가기</S.ChatButton>
          </S.Buttons>
        </S.Wrap>
      </S.Maincontainer>

      <NavBar />
    </S.Container>
  );
};
export default Post;
