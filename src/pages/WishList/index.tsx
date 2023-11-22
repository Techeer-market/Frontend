import React from 'react';
import ProductForm from '@/components/ProductForm';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import { Product } from '@/types/product';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Loading from '@/components/Loading';
import { restFetcher } from '@/queryClient';
import { useInfiniteQuery } from '@tanstack/react-query';

const WishList: React.FC = () => {
  const fetchWishList = async ({ pageParam = 1 }) => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: '/mypage/like',
        params: { pageNo: pageParam, pageSize: 5 },
      });

      const productsWithChatroomCounts = await Promise.all(
        response.data.map(async (product: Product) => {
          const chatroomResponse = await restFetcher({
            method: 'GET',
            path: `/chatroom/count/${product.productUuid}`,
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
    ['wishlist'],
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
    <>
      <TopNavBar page="좋아요 목록" />

      <S.ProductContainer>
        {isLoading ? (
          <Loading />
        ) : data ? (
          <ProductForm items={data?.pages.flatMap((page) => page?.data)} />
        ) : (
          <S.EmptyList>좋아요 목록이 없습니다.</S.EmptyList>
        )}
      </S.ProductContainer>
    </>
  );
};

export default WishList;
