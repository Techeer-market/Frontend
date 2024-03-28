import React from 'react';
import { ChatContent } from '../Chat';
import * as S from '@/components/ChatOtherMessage/styles';
import moment from 'moment';

interface IChatMessage {
  message: ChatContent;
}

const ChatOtherMessage = ({ message }: IChatMessage) => {
  return (
    <S.Container>
      <S.CreatedTime>{moment(message.data.createdAt).format('HH:mm')}</S.CreatedTime>
      <S.OtherMessage>{message.data.message}</S.OtherMessage>
    </S.Container>
  );
};

export default ChatOtherMessage;
