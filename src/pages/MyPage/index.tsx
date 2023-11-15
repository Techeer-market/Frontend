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

interface UserInfo {
  email: string;
  name: string;
  barthday: string;
  social: string;
  profileUrl: string;
}

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
      <S.MyPageContainer>
        <label htmlFor="Profile">
          <S.ChangeName src={userInfo?.profileUrl || profile} alt="Profile" />
        </label>
        <S.Name>{userInfo?.name}</S.Name>
      </S.MyPageContainer>

      <S.Div>
        <S.Title>나의 거래</S.Title>

        <S.ItemBox>
          <S.ClickArea onClick={() => navigate('/wishlist')}>
            <img src={Heart} alt="heartIcon" />
            <S.Item>좋아요 목록</S.Item>
          </S.ClickArea>
        </S.ItemBox>
        <S.ItemBox>
          <S.ClickArea onClick={() => navigate('/saleslist')}>
            <img src={Store} alt="StoreIcon" />
            <S.Item>판매 내역</S.Item>
          </S.ClickArea>
        </S.ItemBox>
        <S.ItemBox>
          <S.ClickArea onClick={() => navigate('/purchaselist')}>
            <img src={Cart} alt="CartIcon" />
            <S.Item>구매 내역</S.Item>
          </S.ClickArea>
        </S.ItemBox>

        <S.NavBtn onClick={() => navigate('/edit_info')}>계정 / 정보 관리</S.NavBtn>
      </S.Div>
    </>
  );
};

export default MyPage;
