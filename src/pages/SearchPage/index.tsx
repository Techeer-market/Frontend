import React, { useState } from 'react';
import * as S from '@/pages/SearchPage/styles';
import backBtn from '@/assets/backBtn.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { Product } from '@/types/product';
import { QueryKeys, restFetcher } from '@/queryClient';
import useSearchThing from '@/hooks/useSearchThing';

type LocationState = { thingName: string } | null;

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [thingName, handleThingName, goToMain, onKeyDown] = useSearchThing('');
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
          <S.Input
            placeholder="통합 검색"
            type="text"
            id="search"
            onChange={handleThingName}
            onKeyDown={onKeyDown}
            value={thingName}
          ></S.Input>
        </S.Div>
      </S.Nav>
    </S.Container>
  );
}
