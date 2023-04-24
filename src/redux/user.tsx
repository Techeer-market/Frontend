import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const kakaoLogin = async (code: string) => {
  const navigate = useNavigate();
  return axios({
    method: 'GET',
    url: `http://localhost:8080/api/users/?code=${code}`,
  })
    .then((res) => {
      console.log(res); //토큰 넘어오는 곳
      const ACCESS_TOKEN = res.data.accessToken;
      localStorage.setItem('token', ACCESS_TOKEN);
      navigate('/main');
    })
    .catch((err) => {
      console.log('소설로그인 에러', err);
      alert('로그인에 실패하였씁니다.');
      navigate('/login');
    });
};
