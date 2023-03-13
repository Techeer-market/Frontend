import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <LogoBackground role="button" onClick={() => navigate('/')}>
      <img id="main" src={logo} alt="테커마켓 메인으로 이동"></img>
    </LogoBackground>
  );
};

// 호버 이벤트
const LogoBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12rem;
  margin-bottom: 8rem;
`;

export default Logo;
