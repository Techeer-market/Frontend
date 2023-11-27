import { useState } from 'react';
import * as S from './styles';
import { Link, useNavigate } from 'react-router-dom';
import homeImage from '../../assets/Home.svg';
import heartImage from '../../assets/Heart.svg';
import chatImage from '../../assets/Chat.svg';
import mypageImage from '../../assets/mypage.svg';

const NavBar = () => {
  const navigate = useNavigate();

  //   const handleLogout = () => {
  //     fetch('http://localhost:8080/api/users/logout', {
  //       method: 'POST',
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           navigate('/login');
  //         } else {
  //           console.log('logout failed');
  //         }
  //       })
  //       .catch((error) => {
  //         console.log('Error  : ', error);
  //       });
  //   };

  return (
    <S.NavbarContainer>
      <S.User>
        <Link to="/ " style={{ textDecoration: 'none' }}>
          <S.Button>
            <S.LogoImage
              src={homeImage}
              alt="로고 이미지"
              style={{ margin: '0px 0px 5px 0px', width: '30px' }}
            />
            홈
          </S.Button>
        </Link>

        <Link to="/wishlist" style={{ textDecoration: 'none' }}>
          <S.Button>
            <S.LogoImage
              src={heartImage}
              alt="로고 이미지"
              style={{ margin: '0px 0px 5px 0px', width: '30px' }}
            />
            좋아요
          </S.Button>
        </Link>
        <Link to="/chat" style={{ textDecoration: 'none' }}>
          <S.Button>
            <S.LogoImage
              src={chatImage}
              alt="로고 이미지"
              style={{ margin: '0px 0px 5px 0px', width: '30px' }}
            />
            채팅
          </S.Button>
        </Link>

        <Link to="/mypage" style={{ textDecoration: 'none' }}>
          <S.Button>
            <S.LogoImage
              src={mypageImage}
              alt="로고 이미지"
              style={{ margin: '0px 0px 8px 0px', width: '20px' }}
            />
            마이페이지
          </S.Button>
        </Link>
      </S.User>
    </S.NavbarContainer>
  );
};

export default NavBar;
