import * as S from './styles';
import homeImage from '../../assets/Home.svg';
import heartImage from '../../assets/Heart.svg';
import chatImage from '../../assets/Chat.svg';
import mypageImage from '../../assets/mypage.svg';

const BottomNavBar = () => {
  return (
    <S.NavbarContainer>
      <div>
        <S.Button>
          <S.LogoImage src={homeImage} alt="로고 이미지" />홈
        </S.Button>
      </div>

      <div>
        <S.Button>
          <S.LogoImage src={heartImage} alt="로고 이미지" />
          좋아요
        </S.Button>
      </div>

      <div>
        <S.Button>
          <S.LogoImage src={chatImage} alt="로고 이미지" />
          채팅
        </S.Button>
      </div>

      <div>
        <S.Button>
          <S.LogoImage src={mypageImage} alt="로고 이미지" />
          마이페이지
        </S.Button>
      </div>
    </S.NavbarContainer>
  );
};

export default BottomNavBar;
