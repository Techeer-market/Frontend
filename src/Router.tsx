import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/LogIn'));
const KakaoLogin = lazy(() => import('./pages/KakaoLogin'));
const SignUp = lazy(() => import('./pages/SignUp'));
const WritePost = lazy(() => import('./pages/WritePost'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao" element={<KakaoLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<WritePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
