import styled from 'styled-components';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    //로고 컴포넌트
    <LogoBackground role="button">
      <img
        id="main"
        src={logo}
        alt="홈페이지 메인으로 이동"
        loading="lazy"
        onClick={() => navigate('/')}
      ></img>
    </LogoBackground>
  );
};
export default Logo;

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
`;
