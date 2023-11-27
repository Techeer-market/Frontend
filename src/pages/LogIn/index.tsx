import React, { useCallback, useState } from 'react';
import * as S from './styles';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { KAKAO_AUTH_URL } from '@/utils/OAuth.js';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { restFetcher } from '@/queryClient';
import { useMutation } from '@tanstack/react-query';

const JWT_EXPIRY_TIME = 1000 * 60 * 60 * 3 - 1000 * 60 * 10; // 3시간 - 10분

interface LoginInfo {
  email: string;
  password: string;
}

const Login = () => {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({ email: '', password: '' });
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setLoginInfo((prevState) => ({ ...prevState, email: emailCurrent }));

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 아닙니다.');
        setIsEmail(false);
      } else {
        setEmailMessage('');
        setIsEmail(true);
      }
    },
    [loginInfo],
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
      const passwordCurrent = e.target.value;
      setLoginInfo((prevState) => ({ ...prevState, password: passwordCurrent }));

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage('비밀번호 형식이 아닙니다. 영문, 숫자 포함 8~15자로 입력해주세요.');
        setIsPassword(false);
      } else {
        setPasswordMessage('');
        setIsPassword(true);
      }
    },
    [loginInfo],
  );

  const loginMutation = useMutation(async (loginInfo: LoginInfo) => {
    const response = await restFetcher({
      method: 'POST',
      path: '/users/login',
      body: loginInfo,
    });
    return response;
  });

  const handleLogin = async () => {
    try {
      const response = await loginMutation.mutateAsync(loginInfo);

      if (response && response.headers) {
        const accessToken = response.headers['access-token'];
        const refreshToken = response.headers['refresh-token'];

        if (accessToken && refreshToken) {
          localStorage.setItem('access-token', accessToken);
          localStorage.setItem('refresh-token', refreshToken);

          // 토큰 만료 시간 저장
          let expirationTime = new Date(new Date().getTime() + JWT_EXPIRY_TIME).toISOString();
          localStorage.setItem('expirationTime', expirationTime);
          navigate('/', { replace: true });
        } else {
          throw new Error('토큰을 받아올 수 없습니다.');
        }
      }
    } catch (error) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      setLoginInfo({ email: '', password: '' });
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
          value={loginInfo.email}
          onChange={onChangeEmail}
        />
        {loginInfo.email.length > 0 && (
          <S.Message className={`message ${isEmail ? 'true' : 'false'}`}>{emailMessage}</S.Message>
        )}
        <S.Input
          name="password"
          placeholder="비밀번호"
          type="password"
          value={loginInfo.password}
          onChange={onChangePassword}
        />
        {loginInfo.password.length > 0 && (
          <S.Message className={`message ${isPassword ? 'true' : 'false'}`}>
            {passwordMessage}
          </S.Message>
        )}
      </S.Form>
      <S.Etc>
        <S.Check>
          <S.Checkbox type="checkbox" />
          <S.CheckLogin>로그인 상태 유지</S.CheckLogin>
        </S.Check>
        <S.FindAccount>아이디/비밀번호 찾기</S.FindAccount>
      </S.Etc>

      <S.Buttons>
        <S.LogInButton type="submit" onClick={handleLogin} disabled={!(isEmail && isPassword)}>
          로그인
        </S.LogInButton>
        {/* <S.KakaoButton as="a" href={KAKAO_AUTH_URL}>
          <RiKakaoTalkFill size={'3.3rem'} />
          &nbsp;&nbsp;카카오 계정으로 로그인
        </S.KakaoButton> */}
        <S.SignUpeButton onClick={goToSign}>회원가입</S.SignUpeButton>
      </S.Buttons>
    </S.LoginForm>
  );
};

export default Login;
