import React from 'react';
import styled from 'styled-components';
import Logo from '@/components/Logo';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';

//로고 컴포넌트로 빼놓기

const LogIn = () => {
  return (
    <Login>
      <Logo />
      <Form>
        <Input placeholder="이메일" type="email" />
        <Input placeholder="비밀번호" type="password" />
      </Form>
      <Etc>
        <Check>
          <Checkbox type="checkbox" />
          <CheckLogin>로그인 상태 유지</CheckLogin>
        </Check>
        <FindAccount>아이디/비밀번호 찾기</FindAccount>
      </Etc>

      <Buttons>
        <LogInButton>로그인</LogInButton>
        <KakaoButton>
          <RiKakaoTalkFill size={'3.2rem'} />
          &nbsp;&nbsp;카카오 계정으로 로그인
        </KakaoButton>
        <GoogleButton>
          <FcGoogle size={'3.2rem'} />
          &nbsp;&nbsp;&nbsp;&nbsp;구글 계정으로 로그인
        </GoogleButton>
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
const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 33rem;
  height: 4.5rem;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 50px;
  padding-left: 17px;
`;

const Etc = styled.div`
  width: 33rem;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: space-between;
  margin-top: -2rem;
  margin-bottom: 6rem;
`;
const Check = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Checkbox = styled.input`
  width: 1.5rem;
  height: 1.5rem;
`;
const CheckLogin = styled.button`
  background: none;
  border: 0;
`;
const FindAccount = styled.button`
  background: none;
  border: 0;
  text-decoration: underline;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;
const LogInButton = styled.button`
  width: 33rem;
  height: 5.5rem;
  border-radius: 10px;
  background: #000;
  color: white;
  border: none;
  margin-bottom: 12px;
`;
const KakaoButton = styled.button`
  width: 33rem;
  height: 5.5rem;
  border-radius: 10px;
  background: #ffdb20;
  border: none;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GoogleButton = styled.button`
  width: 33rem;
  height: 5.5rem;
  border-radius: 10px;
  border: 2px solid #dfdfdf;
  background: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LogIn;