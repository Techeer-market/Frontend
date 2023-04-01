import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Welcome = lazy(() => import('./pages/Welcome'));
const Login = lazy(() => import('./pages/LogIn'));
const KakaoLogin = lazy(() => import('./pages/KakaoLogin'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/kakaoLogin" element={<KakaoLogin />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
