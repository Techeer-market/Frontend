import NavBar from '@/components/NavBar';
import React from 'react';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';
import * as S from './styles';
import logo from '../../assets/logo.svg';
import categoryBar from '../../assets/categoryBar.svg';
import searchBtn from '../../assets/Search.svg';
import plusImage from '../../assets/plus.png';
import { Product } from '@/types/product';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Link } from 'react-router-dom';
import useFetchProductList from '@/hooks/useFetchProductList';
const index: React.FC = () => {
  const path = '/products/list',
    queryKey = 'main';
  const { data, isLoading, hasNextPage, fetchNextPage } = useFetchProductList({ path, queryKey });

  useInfiniteScroll({ fetchCallback: fetchNextPage });

  return (
    <S.MainDiv>
      <Link to="/write">
        <S.Button>
          <img src={plusImage} alt="" />
        </S.Button>
      </Link>
      <S.NavContainer>
        <S.Nav>
          <img id="main_logo" alt="To Main" loading="lazy" src={logo} />
          <Link to="/category">
            <img id="category" alt="To category" src={categoryBar} />
          </Link>
          <Link to="/search">
            <img id="search" alt="To search" src={searchBtn}></img>
          </Link>
        </S.Nav>
      </S.NavContainer>

      <S.MainContainer className="list">
        <S.scroll className="scroll">
          <S.ProductContainer>
            {isLoading ? (
              <Loading />
            ) : data && data?.pages.flatMap((page) => page.data).length > 0 ? (
              <ProductForm items={data?.pages.flatMap((page) => page?.data)} />
            ) : (
              <S.EmptyList>상품 목록이 없습니다.</S.EmptyList>
            )}
          </S.ProductContainer>
        </S.scroll>
      </S.MainContainer>
      <NavBar />
    </S.MainDiv>
  );
};

export default index;
