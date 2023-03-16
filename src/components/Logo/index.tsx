import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <LogoBackground role="button" onClick={() => navigate('/')}>
      <img id="main" src={logo} alt="홈페이지 메인으로 이동"></img>
    </LogoBackground>
  );
};
// 로고 이미지 사이즈 줄이기
const LogoBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 8vh;
  margin-top: 12rem;
  margin-bottom: 8rem;
  @media screen and (max-width: 1080px) {
  }
`;

export default Logo;
