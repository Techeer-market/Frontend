import React, { useState, useEffect, useRef } from 'react';
import ProductForm from '@/components/ProductForm';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import { Product } from '@/types/product';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Loading from '@/components/Loading';
import { getClient, restFetcher } from '@/queryClient';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const WishList: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const idx = useRef<number>(1);
  const queryClient = getClient();

  // 좋아요를 누른 상품 리스트 불러오는 함수
  const fetchWishList = async (page: number) => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: '/mypage/like',
        params: { pageNo: page, pageSize: 5 },
      });

      if (response) {
        const chatroomCountPromises = response.data.map((product: Product) => {
          return restFetcher({
            method: 'GET',
            path: `/chatroom/count/${product.productUuid}`,
          });
        });

        const chatroomCounts = await Promise.all(chatroomCountPromises);
        const updatedProducts = response.data.map((product: Product, index: number) => ({
          ...product,
          chatroomCount: chatroomCounts[index].data,
        }));

        return updatedProducts;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { isLoading } = useQuery<Product[], AxiosError>(
    ['wishList', idx.current],
    () => fetchWishList(idx.current),
    {
      onSuccess: (newData) => {
        if (newData.length === 0) {
          setHasMore(false);
        }
        setItems((prevItems) => [...prevItems, ...newData]);
        idx.current++;
      },
      onError: (error) => {
        if (error.response?.status === 404) {
          setHasMore(false);
        }
      },
    },
  );

  useInfiniteScroll({
    fetchCallback: async () => {
      if (!isLoading && hasMore) {
        await queryClient.fetchQuery(['wishList', idx.current], () => fetchWishList(idx.current));
      }
    },
  });

  useEffect(() => {
    fetchWishList(idx.current);
  });

  return (
    <>
      <TopNavBar page="좋아요 목록" />

      <S.ProductContainer>
        {isLoading ? <Loading /> : <ProductForm items={items} />}
      </S.ProductContainer>
    </>
  );
};

export default WishList;
