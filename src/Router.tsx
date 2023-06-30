import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/LogIn'));
const KakaoLogin = lazy(() => import('./pages/KakaoLogin'));
const SignUp = lazy(() => import('./pages/SignUp'));
const WritePost = lazy(() => import('./pages/WritePost'));
const Post = lazy(() => import('./pages/Post'));
// const EditPost = lazy(() => import('./pages/EditPost'));
const ProductCategory = lazy(() => import('./pages/ProductCategory'));
// const PurchaseList = lazy(() => import('./pages/PurchaseList'));
const Chatting = lazy(() => import('./pages/Chatting'));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao" element={<KakaoLogin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/write" element={<WritePost />} />
        <Route path="/post" element={<Post />} />
        {/* <Route path="/edit" element={<EditPost />} /> */}
        <Route path="/category/:categoryName" element={<ProductCategory />} />
        {/* <Route path="/purchaselist" element={<PurchaseList />} /> */}
        <Route path="/chat" element={<Chatting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
