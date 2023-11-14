import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const checkAuthToken = () => {
  const navigate = useNavigate();

  try {
    const { authTokens } = useAuth();

    // 토큰이 없는 경우 : 로그인 페이지로 이동
    if (!authTokens) {
      navigate('/login');
    } else {
      // 토큰이 있는 경우 : 토큰 유효성 검사
    }
  } catch (error) {
    console.error(error);
  }

  const checkToken = async (token: string) => {};
};

export default checkAuthToken;
