import React, { useState } from 'react';
import * as S from './style';
import userIcon from '../../assets/profile.svg';
import { restFetcher } from '@/queryClient';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInfo } from '@/types/userInfo';
import phone from '../../assets/phone.png';
import { useNavigate } from 'react-router-dom';

// interface ChatFormProps {
//   productId: number;
//   roomName?: string | '';
// }
export interface ResChatMessage {
  id: number;
  productId: number;
  productTitle: string;
  productLocation: string;
  productPrice: number;
  productThumbnail: string;
  chatPartnerName: string;
}

const [messages, setMessages] = useState<ResChatMessage[]>([]);
const ChatForm = async () => {
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
  const goToChatRoom = () => {
    navigate('/chat/room');
    //   const queryParams: { [key: string]: number | string } = {
    //     productId: productId,
    //     roomName: roomName,
  };

  // const queryString = Object.entries(queryParams)
  //   .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  //   .join('&');

  const response = restFetcher({
    method: 'GET',
    path: '/chat/room',
    headers: {
      'Access-Token':
        'access_token:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNzE5NTkzMjg5fQ.bWrT2SrHqwJD9w8_eX5ujA4FI6AQ151Ubwh5kvMIuMI',
    },
  });

  console.log();

  return (
    <S.Container>
      <S.Div onClick={goToChatRoom}>
        <S.Icon>
          <S.IconImage src={userInfo?.profileUrl ? userInfo.profileUrl : userIcon} />
        </S.Icon>
        <S.Texts>
          <S.TopText>
            <S.NameText>ㅌ</S.NameText>
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
