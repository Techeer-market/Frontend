import axios from 'axios';
import React, { useCallback, useState } from 'react';
// import styled from 'styled-components';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { KAKAO_AUTH_URL } from '@/utils/OAuth.js';
import Logo from '@/components/Logo';
import { RiKakaoTalkFill } from 'react-icons/ri';

interface LoginInfo {
  email: string;
  password: string;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);
    },
    [],
  );

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo: LoginInfo = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `http://54.180.142.116:8080/api/users/login`,
        userInfo,
      );
      console.log(res);
      // 로컬 스토리지에 사용자 정보 저장
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('uuid', res.data.userUuid);
      console.log(localStorage);

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const goToSign = () => {
    navigate('/signup');
  };

  return (
    <S.LoginForm onSubmit={handleLogin}>
      <Logo />
      <S.Form>
        <S.Input
          name="email"
          placeholder="이메일"
          type="email"
          value={email}
          onChange={onChangeEmail}
        />
        {email.length > 0 && (
          <S.Message className={`message ${isEmail ? 'true' : 'false'}`}>
            {emailMessage}
          </S.Message>
        )}
        <S.Input
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
      </S.Form>
      <S.Etc>
        <S.Check>
          <S.Checkbox type="checkbox" />
          <S.CheckLogin>로그인 상태 유지</S.CheckLogin>
        </S.Check>
        <S.FindAccount>아이디/비밀번호 찾기</S.FindAccount>
      </S.Etc>

      <S.Buttons>
        <S.LogInButton type="submit">로그인</S.LogInButton>
        <S.KakaoButton as="a" href={KAKAO_AUTH_URL}>
          <RiKakaoTalkFill size={'3.3rem'} />
          &nbsp;&nbsp;카카오 계정으로 로그인
        </S.KakaoButton>
        <S.SignUpeButton onClick={goToSign}>회원가입</S.SignUpeButton>
      </S.Buttons>
    </S.LoginForm>
  );
}

export default Login;
