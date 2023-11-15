import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthContextType {
  authTokens: AuthTokens;
  setTokens: (tokens: AuthTokens) => void;
  clearTokens: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens>({
    accessToken: null,
    refreshToken: null,
  });

  const setTokens = (tokens: AuthTokens) => {
    setAuthTokens(tokens);
  };

  const clearTokens = () => {
    setAuthTokens({ accessToken: null, refreshToken: null });
  };

  return (
    <AuthContext.Provider value={{ authTokens, setTokens, clearTokens }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에 있어야 합니다. AuthProvider를 찾을 수 없습니다.');
  }
  return context;
};
