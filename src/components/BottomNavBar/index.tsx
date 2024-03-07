import { useState } from 'react';
import * as S from './styles';
import { Link, useNavigate } from 'react-router-dom';
import homeImage from '../../assets/Home.svg';
import heartImage from '../../assets/Heart.svg';
import chatImage from '../../assets/Chat.svg';
import mypageImage from '../../assets/mypage.svg';

const BottomNavBar = () => {
  const navigate = useNavigate();

  const [showSearchModule, setShowSearchModule] = useState(false);

  return (
    <S.NavbarContainer>
      <Link to="/ " style={{ textDecoration: 'none' }}>
        <S.Button>
          <S.LogoImage src={homeImage} alt="로고 이미지" />홈
        </S.Button>
      </Link>

      <Link to="/wishlist" style={{ textDecoration: 'none' }}>
        <S.Button>
          <S.LogoImage src={heartImage} alt="로고 이미지" />
          좋아요
        </S.Button>
      </Link>

      <Link to="/chat" style={{ textDecoration: 'none' }}>
        <S.Button>
          <S.LogoImage src={chatImage} alt="로고 이미지" />
          채팅
        </S.Button>
      </Link>

      <Link to="/mypage" style={{ textDecoration: 'none' }}>
        <S.Button>
          <S.LogoImage src={mypageImage} alt="로고 이미지" />
          마이페이지
        </S.Button>
      </Link>
    </S.NavbarContainer>
  );
};

export default BottomNavBar;
