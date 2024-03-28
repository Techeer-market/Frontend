import React from 'react';
import * as S from './styles';
import moment from 'moment';
import 'moment/locale/ko';
import { ChatContent } from '../Chat';
import ChatMessage from '../ChatMessage';

interface IChatContainer {
  chatList: ChatContent[];
  setChatList: React.Dispatch<React.SetStateAction<ChatContent[]>>;
}

const ChatContainer = ({ chatList, setChatList }: IChatContainer) => {
  return (
    <S.Container>
      {chatList.length !== 0 && (
        <S.TodayDate>
          {moment(chatList[0].data.createdAt).format('YYYY년 MM월 DD일 dddd요일')}
        </S.TodayDate>
      )}
      {chatList.map((message, index) => {
        return index !== 0 &&
          Number(moment(chatList[index - 1].data.createdAt).format('YYMMDD')) !==
            Number(moment(chatList[index].data.createdAt).format('YYMMDD')) ? (
          <div style={{ display: 'flex', flexDirection: 'column' }} key={index}>
            <S.TodayDate style={{ alignSelf: 'center' }}>
              {moment(message.data.createdAt).format('YYYY년 MM월 DD일 ddddd요일')}
            </S.TodayDate>
            <div style={{ alignSelf: 'flex-end', marginRight: '13px' }}>
              <ChatMessage message={message} />
            </div>
          </div>
        ) : (
          <div key={index} style={{ alignSelf: 'flex-end', marginRight: '13px' }}>
            <ChatMessage message={message} />
          </div>
        );
      })}
    </S.Container>
  );
};

export default ChatContainer;
