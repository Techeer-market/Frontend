import React from 'react';
import styled from 'styled-components';
import Logo from '@/components/Logo';

//로고 컴포넌트로 빼놓기

const LogIn = () => {
  return (
    <Login>
      <Logo />
      <Form>
        <Inputs>
          <Email placeholder="Email" />
          <Password placeholder="Password" />
          <Etc>
            <Checkbox type="checkbox" />
            <CheckLogin>로그인 상태 유지</CheckLogin>
            <FindAccount>아이디/비밀번호 찾기</FindAccount>
          </Etc>
        </Inputs>
      </Form>

      <Buttons>
        <LogInButton />
        <KakaoButton />
        <GoogleButton />
      </Buttons>
    </Login>
  );
};

const Login = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1080px) {
    justify-content: center;
  }
`;
const Form = styled.div``;
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;
const Email = styled.input``;
const Password = styled.input``;
const Etc = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Checkbox = styled.input``;
const CheckLogin = styled.h3`
/* 폰트 */
  /* font-family: LineSeedKRBd; */
`;
const FindAccount = styled.h3``;
const Buttons = styled.div``;
const LogInButton = styled.button``;
const KakaoButton = styled.button``;
const GoogleButton = styled.button``;

export default LogIn;
