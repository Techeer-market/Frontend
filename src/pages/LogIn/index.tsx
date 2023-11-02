import axios from 'axios';
import React, { useCallback, useState } from 'react';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '@/utils/OAuth.js';
import Logo from '@/components/Logo';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { restFetcher } from '@/queryClient';
import { api } from '@/queryClient';

// 만료 시간 (ms)
const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

interface LoginInfo {
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const navigate = useNavigate();

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);
  }, []);

  const handleLogin = async () => {
    const loginInfo: LoginInfo = {
      email,
      password,
    };

    try {
      const response = await restFetcher({
        method: 'POST',
        path: '/users/login',
        body: loginInfo,
      });

      console.log(response);
      console.log(response.headers);

      if (response && response.headers) {
        const accessToken = response.headers['access-token'];
        const refreshToken = response.headers['refresh-token'];

        if (accessToken && refreshToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          alert('로그인에 성공했습니다.');
          navigate('/');
        } else {
          throw new Error('토큰을 받아올 수 없습니다.');
        }
      }
    } catch (error) {
      console.log(error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const goToSign = () => {
    navigate('/signup');
  };

  return (
    <S.LoginForm>
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
          <S.Message className={`message ${isEmail ? 'true' : 'false'}`}>{emailMessage}</S.Message>
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
        <S.LogInButton type="submit" onClick={handleLogin}>
          로그인
        </S.LogInButton>
        <S.KakaoButton as="a" href={KAKAO_AUTH_URL}>
          <RiKakaoTalkFill size={'3.3rem'} />
          &nbsp;&nbsp;카카오 계정으로 로그인
        </S.KakaoButton>
        <S.SignUpeButton onClick={goToSign}>회원가입</S.SignUpeButton>
      </S.Buttons>
    </S.LoginForm>
  );
};

export default Login;
