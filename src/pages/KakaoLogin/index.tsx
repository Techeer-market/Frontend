import React, { useEffect } from 'react';
import axios from 'axios';

function KakaoLogin() {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    let code = params.get('code');
    const Login = async () => {
      await axios
        .get(`localhost:8080/api/users/auth/kakao?code=${code}`)
        .then((res) => {
          localStorage.setItem('token', res.headers.authorization);
          window.location.href = '/';
        })
        .catch((err) => {
          console.log(err);
          // alert('로그인 에러입니다 다시 시도하세연');
        });
    };
    Login();
  }, []);

  useEffect(() => {
    if (!location.search) return;
    KakaoLogin();
  }, []);

  return <></>;
}
export default KakaoLogin;
