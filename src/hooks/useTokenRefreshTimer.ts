import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const JWT_EXPIRY_TIME = 1000 * 60 * 60 * 3 - 1000 * 60 * 10; // 3시간 - 10분

// 액세스 토큰 만료 시간이 지나면 리프레쉬 토큰으로 재발급
export const useTokenRefreshTimer = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/login') {
      return;
    }

    let time = localStorage.getItem('expirationTime') ?? '';

    if (!time) {
      let expirationTime = new Date(new Date().getTime() + JWT_EXPIRY_TIME).toISOString();
      localStorage.setItem('expirationTime', expirationTime);
      time = expirationTime;
    }

    const remainingTime = calculateRemainingTime(time);
    const timer = setTimeout(() => refreshTokens(), remainingTime);
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  });

  const refreshTokens = async () => {
    try {
      const response = await axios.get(
        'http://techeermarket.ap-northeast-2.elasticbeanstalk.com/api/users/authorize',
        {
          headers: { 'Refresh-Token': `${localStorage.getItem('refresh-token')}` },
        },
      );
      const newAuthTokens = response.headers['access-token'];
      localStorage.setItem('access-token', newAuthTokens);

      // 새로운 만료 시간 저장
      let expirationTime = new Date(new Date().getTime() + JWT_EXPIRY_TIME).toISOString();
      localStorage.setItem('expirationTime', expirationTime);
    } catch (error) {
      if (error === 401 || error) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        clearLocalStorage();
        window.location.href = '/login';
      }
    }
  };
};

export const clearLocalStorage = () => {
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('userId');
};

// 남은 시간 유효 시간 계산
export const calculateRemainingTime = (expirationTime: string): number => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};
