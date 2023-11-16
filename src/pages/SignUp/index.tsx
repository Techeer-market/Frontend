import * as S from '@/pages/SignUp/styles';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <img
        id="main"
        src={logo}
        alt="홈페이지 메인으로 이동"
        loading="lazy"
        onClick={() => navigate('/')}
      ></img>
      <S.Inputs>
        <S.NameInput placeholder="이름"></S.NameInput>
        <S.EmailInput type="email" placeholder="이메일"></S.EmailInput>
        <S.PasswordInput type="password" placeholder="비밀번호"></S.PasswordInput>
        <S.PasswordCorrectInput
          type="password"
          placeholder="비밀번호 확인"
        ></S.PasswordCorrectInput>
      </S.Inputs>
      <S.Buttons>
        <S.SaveBtn type="submit">저장하기</S.SaveBtn>
        <S.CancelBtn>취소하기</S.CancelBtn>
      </S.Buttons>
    </S.Container>
  );
};

export default index;
