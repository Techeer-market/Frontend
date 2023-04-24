import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken, setToken, decodeAccessToken } from '@/utils/tokenManager';
import { KAKAO_AUTH_URL } from '@/utils/OAuth.js';
import Logo from '@/components/Logo';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/Si';
import axios from 'axios';
import { setUUID } from '@/redux/userID';

interface LoginInfo {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

function Login() {
  const [email, setEmail] = useState<string>('');
  // const [password, setPassword] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  // const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [isEmail, setIsEmail] = useState<boolean>(false);
  // const [isPassword, setIsPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //email
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 아닙니다.');
        setIsEmail(false);
      } else {
        setEmailMessage('');
        setIsEmail(true);
      }
    },
    [],
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userInfo: LoginInfo = {
      email: data.get('email'),
      password: data.get('password'),
    };

    (async () => {
      await axios
        .post(`localhost:8080/api/login`, userInfo)
        .then((res) => {
          setToken(res.data.access, res.data.refresh);
          const uuid = decodeAccessToken(getToken().access || '');
          dispatch(setUUID(uuid));
          navigate('/');
        })
        .catch((err) => {
          alert('잘못된 정보입니다.');
        });
    })();
  };
  const goToSign = () => {
    navigate('/signup');
  };

  return (
    <LoginForm>
      <Logo />
      <Form onSubmit={handleLogin}>
        <Input
          name="email"
          placeholder="이메일"
          type="email"
          onChange={onChangeEmail}
        />
        {email.length > 0 && (
          <Message className={`message ${isEmail ? 'true' : 'false'}`}>
            {emailMessage}
          </Message>
        )}
        <Input name="password" placeholder="비밀번호" type="password" />
      </Form>
      <Etc>
        <Check>
          <Checkbox type="checkbox" />
          <CheckLogin>로그인 상태 유지</CheckLogin>
        </Check>
        <FindAccount>아이디/비밀번호 찾기</FindAccount>
      </Etc>

      <Buttons>
        <LogInButton type="submit">로그인</LogInButton>
        <KakaoButton as="a" href={KAKAO_AUTH_URL}>
          <RiKakaoTalkFill size={'3.3rem'} />
          &nbsp;&nbsp;카카오 계정으로 로그인
        </KakaoButton>
        <NaverButton>
          <SiNaver size={'2.2rem'} />
          &nbsp;&nbsp;&nbsp;네이버 계정으로 로그인
        </NaverButton>
        <SignUpeButton onClick={goToSign}>회원가입</SignUpeButton>
      </Buttons>
    </LoginForm>
  );
}
const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1080px) {
    justify-content: center;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 36rem;
  height: 4.5rem;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 2.8rem;
  padding-left: 17px;
`;

const Etc = styled.div`
  width: 36rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -1rem;
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
  font-size: 1.4rem;
`;
const FindAccount = styled.button`
  background: none;
  border: 0;
  text-decoration: underline;
  font-size: 1.4rem;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;
const LogInButton = styled.button`
  width: 36rem;
  height: 5.5rem;
  border-radius: 10px;
  background: #000;
  color: white;
  border: none;
  margin-bottom: 12px;
`;
const KakaoButton = styled.button`
  width: 36rem;
  height: 5.5rem;
  border-radius: 10px;
  background: #ffdb20;
  border: none;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;
  font-size: 14px;
`;

const NaverButton = styled.button`
  width: 36rem;
  height: 5.5rem;
  border-radius: 10px;
  background: #00bf18;
  color: white;
  border: none;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SignUpeButton = styled.button`
  width: 36rem;
  height: 5.5rem;
  border-radius: 10px;
  border: 2px solid #dfdfdf;
  background: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.span`
  font-size: 0.8rem;
  color: red;
  display: flex;
  margin-top: -2rem;
  margin-bottom: 2rem;
`;

export default Login;
