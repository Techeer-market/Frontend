import React from 'react';
import * as S from './style';
import userIcon from '@/assets/userIcon.svg';

const ChatForm = () => {
  return (
    <>
      <S.Div>
        <S.Texts>
          <S.TopText />
          <S.NameText />
          <S.DayText />
          <S.Chat />
        </S.Texts>
        <S.Icon id="userIcon" alt="userIcon" loading="lazy" src={userIcon} />
        <S.ProductImage />
      </S.Div>
    </>
  );
};

export default ChatForm;
