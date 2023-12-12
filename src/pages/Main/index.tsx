import NavBar from '@/components/NavBar';
import React from 'react';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';
// import ProductList from '@/components/ProductList';
import * as S from './styles';
import logo from '../../assets/logo.svg';
import categoryBar from '../../assets/categoryBar.svg';
import searchBtn from '../../assets/Search.svg';
import plusImage from '../../assets/PlusBtn.svg';
import { Product } from '@/types/product';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Link } from 'react-router-dom';
import { restFetcher } from '@/queryClient';
import { useInfiniteQuery } from '@tanstack/react-query';

const index: React.FC = () => {
  const fetchWishList = async ({ pageParam = 1 }) => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: '/products/list',
        params: { pageNo: pageParam, pageSize: 10 },
      });

      const productsWithChatroomCounts = await Promise.all(
        response.data.map(async (product: Product) => {
          const chatroomResponse = await restFetcher({
            method: 'GET',
            path: `/chatroom/count/${product.productId}`,
          });
          return { ...product, chatroomCount: chatroomResponse.data };
        }),
      );

      return {
        data: productsWithChatroomCounts,
        nextPage: response.data.length ? pageParam + 1 : undefined,
      };
    } catch (error) {
      return { data: [], nextPage: undefined };
    }
  };

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['main'],
    ({ pageParam = 1 }) => fetchWishList({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.data.length ? lastPage.nextPage : undefined;
      },
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
            ) : data ? (
              <ProductForm items={data?.pages.flatMap((page) => page?.data)} />
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
