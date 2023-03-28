const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URI;

const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;


//로그아웃 추가

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
