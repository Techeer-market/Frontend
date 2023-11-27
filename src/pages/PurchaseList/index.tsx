import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '../../components/ProductForm';
import { Product } from '@/types/product';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { restFetcher } from '@/queryClient';
import Loading from '@/components/Loading';
import { useInfiniteQuery } from '@tanstack/react-query';

const PurchaseList: React.FC = () => {
  const navigate = useNavigate();

  const fetchPurchase = async ({ pageParam = 1 }) => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: '/mypage/purchase',
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
    ['purchaselist'],
    ({ pageParam = 1 }) => fetchPurchase({ pageParam }),
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
      <TopNavBar page="나의 구매 내역" />
      <S.BtnDiv>
        <S.WriteBtn
          onClick={() => {
            navigate('/write');
          }}
        >
          글쓰기
        </S.WriteBtn>
      </S.BtnDiv>

      <S.ProductContainer>
        {isLoading ? (
          <Loading />
        ) : data ? (
          <ProductForm items={data?.pages.flatMap((page) => page.data)} />
        ) : (
          <S.EmptyListMessage>구매 내역이 없습니다.</S.EmptyListMessage>
        )}
      </S.ProductContainer>
    </>
  );
};

export default PurchaseList;
