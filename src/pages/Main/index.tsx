import NavBar from '@/components/NavBar';
import React from 'react';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';
// import ProductList from '@/components/ProductList';
import * as S from './styles';
import logo from '../../assets/logo.svg';
import categoryBar from '../../assets/categoryBar.svg';
import searchBtn from '../../assets/Search.svg';
import plusImage from '../../assets/plus.png';
import { Product } from '@/types/product';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { restFetcher } from '@/queryClient';
import { useInfiniteQuery } from '@tanstack/react-query';

const index: React.FC = () => {
  const fetchWishList = async ({ pageParam = 1 }) => {
    const response = await restFetcher({
      method: 'GET',
      path: '/products/list',
      params: { pageNo: pageParam, pageSize: 5 },
    });

    await Promise.all(
      response.data.map((product: Product) =>
        restFetcher({
          method: 'GET',
          path: `/chatroom/count/${product.productUuid}`,
        }).then((chatroomResponse) => ({
          ...product,
          chatroomCount: chatroomResponse.data,
        })),
      ),
    );

    return { data: response.data, nextPage: response.data.length ? pageParam + 1 : undefined };
  };

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['main'],
    ({ pageParam = 1 }) => fetchWishList({ pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    },
  );

  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useInfiniteScroll({ fetchCallback: loadMore });
  return (
    <S.MainDiv>
      <Link to="/write">
        <S.Button>
          <img src={plusImage} alt="" />
        </S.Button>
      </Link>
      <S.NavContainer>
        <S.Nav>
          <img id="main_logo" alt="To Main" loading="lazy" src={logo}></img>
          <Link to="/category">
            <img id="category" alt="To category" src={categoryBar}></img>
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
            ) : data ? (
              <ProductForm items={data?.pages.flatMap((page) => page.data)} />
            ) : (
              <S.EmptyList>목록이 없습니다 </S.EmptyList>
            )}
          </S.ProductContainer>
        </S.scroll>
      </S.MainContainer>
      <NavBar />
    </S.MainDiv>
  );
};

export default index;
