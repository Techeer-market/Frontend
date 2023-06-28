import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { setUUID } from '@/redux/userID';

interface jwtType {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  user_uuid: string;
}

const getToken = () => {
  const access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');
  return { access, refresh };
};

const setToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

const decodeAccessToken = (accessToken: string) => {
  const decoded = jwtDecode<jwtType>(accessToken);
  console.log(decoded.user_uuid, '체크안됨');
  return decoded.user_id;
};

export { getToken, setToken, decodeAccessToken };
