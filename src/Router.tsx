import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/LogIn'));
const KakaoLogin = lazy(() => import('./pages/KakaoLogin'));
const SignUp = lazy(() => import('./pages/SignUp'));
const WritePost = lazy(() => import('./pages/WritePost'));
const Post = lazy(() => import('./pages/Post'));
// const EditPost = lazy(() => import('./pages/EditPost'));
// const SalesList = lazy(() => import('./pages/SalesList'));
const Chatting = lazy(() => import('./pages/Chatting'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao" element={<KakaoLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<WritePost />} />
        <Route path="/post/:productUuid" element={<Post />} />
        {/* <Route path="/saleslist" element={<SalesList />} /> */}
        <Route path="/chat" element={<Chatting />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
