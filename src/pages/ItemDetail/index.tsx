import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';

import * as S from './styles';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import TopNavBar from '@/components/TopNavBar';
import KakaoMap from '@/components/KakaoMap';
import Heart from '../../assets/grayHeartIcon.svg';
import FilledHeart from '../../assets/likedHeart.svg';
import phone from '../../assets/logo.svg';
import styled from 'styled-components';
import axios from 'axios';
import { salesResultData } from '@/mocks/api/data/salesResultData';
import { UserInfo } from '@/types/userInfo';
import { IoCamera } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { restFetcher } from '@/queryClient';

import Phone from '../../assets/Search.svg';

interface WriteProps {
  categoryName: string;
  productId: string;
  title: string;
  description: string;
  price: number;
  productState: 'SALE' | 'RESERVED' | 'SOLD';
  // "tradeType": "GeneralDeal",
  image_url_1: string | null;
  image_url_2: string | null;
  image_url_3: string | null;
  image_url_4: string | null;
  views: number;
  location: string;
  createdDate: string;
  modifiedDate: string;
}

const Post: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [map, setMap] = useState<any>(null);

  const isWishPage = location.pathname === '/wishlist';

  const { data: userInfo } = useQuery<UserInfo, AxiosError>(
    ['userInfo'],
    async () => {
      const response = await restFetcher({
        method: 'GET',
        path: '/users',
      });
      return response.data;
    },
    {
      onError: (error) => {
        console.error(error);
      },
      // 자동 리프레시 비활성화
      refetchOnWindowFocus: false,
    },
  );

  const tradeTypeMap = {
    CoolDeal: '쿨거래',
    GeneralDeal: '일반거래',
  };

  useEffect(() => {
    const mapContainer = document.getElementById('map');

    if (mapContainer) {
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
      const newMap = new kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap); // 생성된 지도를 상태로 저장합니다
    }
  }, []);
  //   const getProduct = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/products/${productUuid}`);
  //       setProduct(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProduct();
  // }, [productUuid]);
  // if (!product) {
  //   return null;
  // }

  return (
    <S.Container>
      <TopNavBar page="" />
      <S.Maincontainer>
        <S.Wrap>
          <S.Image>
            {product && (
              <img
                // src={salesResultData[0].thumbnailURL} // salesResultData의 첫 번째 항목의 thumbnailURL을 사용
                //src={product.image_url_1}
                alt="Product"
                style={{ width: '40rem', height: '40rem' }}
              />
            )}
          </S.Image>

          <S.Details>
            <S.TypeWrapper>
              <S.NameAndDateWrapper>
                <S.ChangImg
                  src={userInfo?.profileUrl ? userInfo.profileUrl : profile}
                  alt="Profile"
                />
                <div>
                  <S.Name>{userInfo?.name}</S.Name>
                  <S.Date>date</S.Date>
                </div>
              </S.NameAndDateWrapper>

              <Link to="/category">
                <S.Category>디지털기기</S.Category>
              </Link>
            </S.TypeWrapper>
            <S.ProductTitle>productUuid</S.ProductTitle>
          </S.Details>
          <S.Description>
            <S.SubTitle>상품 설명</S.SubTitle>
            <S.Content>설명란</S.Content>
            <map />
          </S.Description>

          <S.Buttons>
            <S.WishlistButton
              style={{ backgroundImage: `url(${isWishPage ? FilledHeart : Heart})` }}
            />

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
