import React from 'react';
import TopNavBar from '@/components/TopNavBar';
import NavBar from '@/components/NavBar';
import * as S from './style';

const index = () => {
  return (
    <>
      <TopNavBar page="채팅 목록" />
      <NavBar />
    </>
  );
};

export default index;
