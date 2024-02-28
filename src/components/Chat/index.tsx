import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Stomp from '@stomp/stompjs';
import * as S from './style';
import { UserInfo } from '@/types/userInfo';
import TopNavBar from '../TopNavBar';
import NavBar from '../NavBar';
import ChatBtn from '../../assets/ChatBtn.svg';

interface ChatProps {
  chatRoomId: string;
  data: ChatData;
}

interface ChatContent {
  type: string;
  chatRoomId: number;
  data: ChatData;
}
interface ChatData {
  chatRoomId: string;
  senderEmail: string;
  message?: string;
  createdAt: Date | string;
}

const Chat = ({ chatRoomId, data }: ChatProps) => {
  const [chatList, setChatList] = useState<ChatContent[]>([]);
  const [chatText, setChatText] = useState('');
  const client = useRef<Stomp.Client>();
  const subscribe = useCallback(() => {
    client.current?.subscribe(`/sub/chat/room/${chatRoomId}`, (body) => {
      const json_body = JSON.parse(body.body);
      setChatList((_chat_list: ChatContent[]) => [..._chat_list, json_body]);
    });
  }, [chatRoomId]);
  const connect = useCallback(() => {
    console.log(
      'Connecting to:',
      'ws://techeermarket.ap-northeast-2.elasticbeanstalk.com/ws-stomp',
    );
    client.current = new Stomp.Client({
      brokerURL: 'ws://techeermarket.ap-northeast-2.elasticbeanstalk.com/ws-stomp',
      connectHeaders: {
        Authorization: localStorage.getItem('token') || '',
      },
      onConnect: () => {
        subscribe();
        console.log('Connected successfully!');
      },
    });
    client.current.activate();
  }, [subscribe]);

  const disconnect = () => {
    client.current?.deactivate();
  };

  const publish = (chat: string) => {
    if (!client.current?.connected) return;
    if (chat.trim() === '') return;
    client.current?.publish({
      destination: '/pub/api/chat/sendMessage',
      body: JSON.stringify({
        chatRoomId: data.chatRoomId,
        senderEmail: data.senderEmail,
        message: data.message,
        createAt: data.createdAt,
      }),
    });
    setChatText('');
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect]);
  return (
    <>
      <TopNavBar page={'홍다연'} />
      <S.Container>
        <S.Div>
          <S.ProductImage />
          <S.Texts>
            <S.ProductName>갤럭시 팔아여</S.ProductName>
            <S.RowDiv>
              <S.Writer>홍다연</S.Writer>
              <S.DayText>3일전</S.DayText>
            </S.RowDiv>
            <S.Price>45000원</S.Price>
          </S.Texts>
        </S.Div>
      </S.Container>
      <S.ChatContent />
      <S.ChatDiv>
        <S.Input placeholder="메시지 보내기" />
        <S.Button src={ChatBtn} />
      </S.ChatDiv>
      <NavBar />
    </>
  );
};
export default Chat;
