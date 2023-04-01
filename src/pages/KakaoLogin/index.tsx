import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function KakaoLogin() {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grant_type = 'authorization_code';
    const client_id = `${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}`;
    const KAKAO_REDIRECT_URI = `${import.meta.env.VITE_APP_KAKAO_REDIRECT_URI}`;
    const KAKAO_REST_API_KEY = `${import.meta.env.VITE_APP_KAKAO_REST_API_KEY}`;
    // const navigate = useNavigate();

    // console.log(
    //   'url : ',
    //   `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}`,
    // );
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_url=${KAKAO_REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      )
      .then((res) => {
        console.log(res);
        const { data } = res;
        const { access_token } = data;
        if (access_token) {
          console.log(`Bearer ${access_token}`);
        }
      })
      .then((res) => {
        console.log('데이터 성공: ');
        console.log(res);
      })
      .catch((error) => {
        alert('로그인 실패');
        // navigate('/login');
      });
  }, []);
  return <></>;
}

export default KakaoLogin;
