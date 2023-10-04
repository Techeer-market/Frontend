import React from 'react';
import * as S from '@/pages/SearchPage/styles';
import backBtn from '@/assets/backBtn.jpg';
import searchBtn from '@/assets/searchBtn.jpg';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Nav>
        <img
          id="back"
          alt="To Main"
          loading="lazy"
          src={backBtn}
          onClick={() => navigate('/')}
        ></img>
        <S.Div>
          <S.Input placeholder="통합 검색" type="text" id="search"></S.Input>
        </S.Div>
      </S.Nav>
    </S.Container>
  );
};

export default index;
