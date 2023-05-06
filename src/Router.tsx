import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Welcome = lazy(() => import('./pages/Welcome'));
const Login = lazy(() => import('./pages/LogIn'));
const KakaoLogin = lazy(() => import('./pages/KakaoLogin'));
const SignUp = lazy(() => import('./pages/SignUp'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Welcome />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/auth/kakao" element={<KakaoLogin />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
