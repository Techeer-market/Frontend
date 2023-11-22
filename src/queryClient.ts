// "test 부분에 배포된 api 주소 설정하기 "
import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';

type AnyOBJ = {
  [key: string]: any;
};

export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client) {
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24, // 24시간
            staleTime: 1000 * 60, // 1분
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    }
    return client;
  };
})();

//const { VITE_BASE_URL } = import.meta.env;
const BASE_URL = import.meta.env.DEV ? '/api' : 'test';
// const BASE_URL = 'http://15.164.213.39:8080/api';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['Access-Token'] = `${token}`;
    } else if (!(window.location.pathname === '/login' || window.location.pathname === '/signup')) {
      // 로그인, 회원가입 페이지에서는 토큰이 없어도 통과
      alert('로그인 후 이용해주세요.');
      window.location.href = '/login';
      throw new Error('토큰이 없습니다.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    let url = `${path}`;
    const axiosConfig: AxiosRequestConfig = {
      method,
    };
    if (body) axiosConfig.data = body;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += '?' + searchParams.toString();
    }
    const res = await api(url, axiosConfig);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const QueryKeys = {
  TEST: 'TEST',
  RESULT: 'RESULT',
  SEARCH: 'SEARCH',
};
