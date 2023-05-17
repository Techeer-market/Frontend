import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function KakaoLogin() {
  useEffect(() => {
    const navigate = useNavigate();
    const params = new URL(document.location.toString()).searchParams;
    const grant_type = `authorization_code`;
    const client_id = `${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}`;
    const KAKAO_REDIRECT_URI = `${import.meta.env.VITE_APP_KAKAO_REDIRECT_URI}`;
    const KAKAO_SECRET_KEY = `${import.meta.env.VITE_APP_KAKAO_SECRET_KEY}`;
    let code = params.get('code');
    const Login = async () => {
      axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${KAKAO_SECRET_KEY}`,
          },
        },
      );
      await axios
        .get(`http://localhost:8080/api/users/auth/kakao?code=${code}`)
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
