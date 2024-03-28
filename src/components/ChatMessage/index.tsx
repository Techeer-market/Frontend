import React from 'react';
import * as S from '@/components/ChatMessage/styles';
import { ChatContent } from '../Chat';
import moment from 'moment';

interface IChatMessage {
  message: ChatContent;
}

const ChatMessage = ({ message }: IChatMessage) => {
  return (
    <S.Container>
      <S.CreatedTime>{moment(message.data.createdAt).format('HH:mm')}</S.CreatedTime>
      <S.MyMessage>{message.data.message}</S.MyMessage>
    </S.Container>
  );
};

export default ChatMessage;
