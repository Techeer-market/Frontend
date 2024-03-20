import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Stomp from '@stomp/stompjs';
import * as S from './styles';
import TopNavBar from '../TopNavBar';
import NavBar from '../NavBar';
import 'moment/locale/ko';
moment.locale('ko');
import moment from 'moment';

interface ChatProps {
  chatRoomId: number;
  data: ChatData;
}

export interface ChatContent {
  type: string;
  chatRoomId: number;
  data: ChatData;
}
export interface ChatData {
  chatRoomId: number;
  senderEmail: string;
  message?: string;
  createdAt: Date | string;
}

export interface ChatResponse {
  content: ChatContent[];
  hasNext: boolean;
  hasPrev: boolean;
  next: number;
  prev: number;
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
    client.current = new Stomp.Client({
      brokerURL: 'ws://techeermarket.ap-northeast-2.elasticbeanstalk.com/ws-stomp',
      connectHeaders: {
        Authorization: localStorage.getItem('token') || '',
      },
      onConnect: () => {
        subscribe();
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

  const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatText(e.currentTarget.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      publish(chatText);
    }
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect]);

  return (
    // 수정
    <>
      <TopNavBar page="홍다연" />
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
      <S.Time>2022-02-22</S.Time>
      <S.ChatContent />
      <S.ChatDiv>
        <S.Input
          type="text"
          placeholder="메시지 보내기"
          onKeyDown={onKeyDown}
          onChange={onTyping}
        />
        <S.Button onClick={() => publish(chatText)} />
      </S.ChatDiv>
      <NavBar />
    </>
  );
};
export default Chat;
