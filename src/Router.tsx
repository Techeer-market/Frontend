import { lazy } from 'react';
const Main = lazy(() => import('./pages/Main'));
const Login = lazy(() => import('./pages/LogIn'));
const KakaoLogin = lazy(() => import('./pages/KakaoLogin'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const WritePost = lazy(() => import('./pages/WritePost'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const WishList = lazy(() => import('@/pages/WishList'));
const PurchaseList = lazy(() => import('@/pages/PurchaseList'));
const SalesList = lazy(() => import('@/pages/SalesList'));
const MyPage = lazy(() => import('@/pages/MyPage'));
const EditInfo = lazy(() => import('@/pages/EditInfo'));
const ItemDetail = lazy(() => import('@/pages/ItemDetail'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));

export const routes = [
  { path: '/', element: <Main /> },
  { path: '/login', element: <Login /> },
  { path: '/auth/kakao', element: <KakaoLogin /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/write', element: <WritePost /> },
  { path: '/item/:productId', element: <ItemDetail /> },
  { path: '/wishlist', element: <WishList /> },
  { path: '/saleslist', element: <SalesList /> },
  { path: '/purchaselist', element: <PurchaseList /> },
  { path: '/mypage', element: <MyPage /> },
  { path: '/edit_info', element: <EditInfo /> },
  { path: '/category', element: <CategoryPage /> },
  { path: `/category/:category`, element: <CategoryPage /> },
  { path: '/search', element: <SearchPage /> },
  // { path: '/detail', element: <Detail /> },
];
