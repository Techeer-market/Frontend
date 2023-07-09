import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/LogIn'));
const KakaoLogin = lazy(() => import('./pages/KakaoLogin'));
const SignUp = lazy(() => import('./pages/SignUp'));
const WritePost = lazy(() => import('./pages/WritePost')); //게시물 등록
const Post = lazy(() => import('./pages/Post')); //게시물 상세
const EditPost = lazy(() => import('./pages/EditPost')); //게시물 수정
const CategoryElectronic = lazy(() => import('./pages/CategoryElectronic')); // 카테고리1
const CategoryFood = lazy(() => import('./pages/CategoryFood')); // 카테고리2
const CategoryLiving = lazy(() => import('./pages/CategoryLiving')); // 카테고리3
const CategoryBook_Magazine = lazy(() => import('./pages/CategoryBook_Magazine')); // 카테고리4
const CategoryFashion = lazy(() => import('./pages/CategoryFashion')); // 카테고리5
const SalesList = lazy(() => import('./pages/SalesList')); //판매리스트
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
        {/* 아래 두 줄은 고유 productUuid로 구분되는 게시물로 이동 */}
        <Route path="/post/:productUuid" element={<Post />} /> 
        <Route path="/edit/:productUuid" element={<EditPost />} />
        <Route path="/category/Electronic" element={<CategoryElectronic />} />
        <Route path="/category/Food" element={<CategoryFood />} />
        <Route path="/category/Living" element={<CategoryLiving />} />
        <Route path="/category/Book_Magazine" element={<CategoryBook_Magazine />} />
        <Route path="/category/Fashion" element={<CategoryFashion />} /> 
        <Route path="/saleslist" element={<SalesList />} />
        <Route path="/chat" element={<Chatting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
