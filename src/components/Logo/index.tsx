import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <LogoBackground role="button">
      <img
        id="main"
        src={logo}
        alt="홈페이지 메인으로 이동"
        onClick={() => navigate('/')}
      ></img>
    </LogoBackground>
  );
};
// 로고 이미지 사이즈 줄이기
const LogoBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 12rem;
  margin-bottom: 8rem;
  /* & img {
    position: absolute;
    width: 200px;
    height: 80px;
    left: 65.4rem;
    top: 1rem;
  } */
`;

export default Logo;
