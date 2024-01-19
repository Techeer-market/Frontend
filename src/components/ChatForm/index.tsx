import React from 'react';
import * as S from './style';
import userIcon from '../../assets/profile.svg';
import { restFetcher } from '@/queryClient';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInfo } from '@/types/userInfo';
import phone from '../../assets/phone.png';

const ChatForm = () => {
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
    <S.Container>
      <S.Div>
        <S.Icon>
          <S.IconImage src={userInfo?.profileUrl ? userInfo.profileUrl : userIcon} />
        </S.Icon>
        <S.Texts>
          <S.TopText>
            <S.NameText>김유라</S.NameText>
            <S.DayText>3일전</S.DayText>
          </S.TopText>
          <S.Chat>넵 수고염</S.Chat>
        </S.Texts>
        <S.ProductImage src={phone}></S.ProductImage>
      </S.Div>
    </S.Container>
  );
};

export default ChatForm;
