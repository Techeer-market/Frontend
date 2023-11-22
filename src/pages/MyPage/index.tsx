import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import profile from '../../assets/profile.png';
import Heart from '../../assets/HeartIcon.svg';
import Store from '../../assets/StoreIcon.svg';
import Cart from '../../assets/CartIcon.svg';
import TopNavBar from '@/components/TopNavBar';
import { restFetcher } from '@/queryClient';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInfo } from '@/types/userInfo';
import { IoCamera } from 'react-icons/io5';

const NAV_ITEMS = [
  { path: '/wishlist', imgSrc: Heart, altText: 'heartIcon', label: '좋아요 목록' },
  { path: '/saleslist', imgSrc: Store, altText: 'StoreIcon', label: '판매 내역' },
  { path: '/purchaselist', imgSrc: Cart, altText: 'CartIcon', label: '구매 내역' },
];

const MyPage: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <>
      <TopNavBar page="마이페이지" />

      <S.Div>
        <S.MyPageContainer>
          <S.ChangImg src={userInfo?.profileUrl ? userInfo.profileUrl : profile} alt="Profile" />

          <S.CameraIcom>
            <IoCamera size={10} />
          </S.CameraIcom>

          <S.Name>{userInfo?.name}</S.Name>
        </S.MyPageContainer>

        <S.Title>나의 거래</S.Title>

        {NAV_ITEMS.map((item, index) => (
          <S.ItemBox key={index}>
            <S.ClickArea onClick={() => navigate(item.path)}>
              <img src={item.imgSrc} alt={item.altText} />
              <S.Item>{item.label}</S.Item>
            </S.ClickArea>
          </S.ItemBox>
        ))}

        <S.NavBtn onClick={() => navigate('/edit_info')}>계정 / 정보 관리</S.NavBtn>
      </S.Div>
    </>
  );
};

export default MyPage;
