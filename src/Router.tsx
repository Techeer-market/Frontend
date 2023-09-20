import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/LogIn'));
const KakaoLogin = lazy(() => import('./pages/KakaoLogin'));
const SignUp = lazy(() => import('./pages/SignUp'));
const WritePost = lazy(() => import('./pages/WritePost'));
const Post = lazy(() => import('./pages/Post'));
// const EditPost = lazy(() => import('./pages/EditPost'));
const CategoryElectronic = lazy(() => import('./pages/CategoryElectronic'));
const CategoryFood = lazy(() => import('./pages/CategoryFood'));
const CategoryLiving = lazy(() => import('./pages/CategoryLiving'));
const CategoryBook_Magazine = lazy(() => import('./pages/CategoryBook_Magazine'));
const CategoryFashion = lazy(() => import('./pages/CategoryFashion'));
// const WishList = lazy(() => import('./pages/')) // 위시리스트
const PurchaseList = lazy(() => import('./pages/PurchaseList'));
const SalesList = lazy(() => import('./pages/SalesList'));
const Chatting = lazy(() => import('./pages/Chatting'));
const CProfile = lazy(() => import('./pages/CProfile'));

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
        {/* <Route path="/edit" element={<EditPost />} /> */}
        <Route path="/category/Electronic" element={<CategoryElectronic />} />
        <Route path="/category/Food" element={<CategoryFood />} />
        <Route path="/category/Living" element={<CategoryLiving />} />
        <Route path="/category/Book_Magazine" element={<CategoryBook_Magazine />} />
        <Route path="/category/Fashion" element={<CategoryFashion />} />
        {/* <Route path="/wishlist" element={<WishList/>} /> */}
        <Route path="/saleslist" element={<SalesList />} />
        <Route path="/purchaselist" element={<PurchaseList/>} />
        <Route path="/profile" element={<CProfile/>} />
        <Route path="/chat" element={<Chatting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
