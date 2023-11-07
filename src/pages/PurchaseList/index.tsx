import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '../../components/ProductForm';
import { Product } from '@/types/product';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getClient, restFetcher } from '@/queryClient';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const PurchaseList: React.FC = () => {
  const queryClient = getClient();
  const navigate = useNavigate();
  const idx = useRef<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data: items, isLoading } = useQuery<Product[], AxiosError>(
    ['purchaseList', idx.current],
    async () => {
      const response = await restFetcher({
        method: 'GET',
        path: '/mypage/purchase',
        params: { pageNo: idx.current, pageSize: 5 },
      });
      return response.data;
    },
    {
      onSuccess: async (data) => {
        if (data.length === 0) {
          setHasMore(false);
        } else {
          Promise.all(
            data.map((product) => {
              restFetcher({
                method: 'GET',
                path: `/chatroom/count/${product.productUuid}`,
              }).then((response) => {
                product.chatroomCount = response.data;
              });
            }),
          );
        }
      },
      onError: (error) => {
        if (error.response?.status === 404) {
          setHasMore(false);
        }
      },
      // 이전 데이터 유지
      keepPreviousData: true,
    },
  );

  useInfiniteScroll({
    fetchCallback: async () => {
      if (!isLoading && hasMore) {
        await queryClient.fetchQuery(['purchaseList', idx.current]).then(() => {
          idx.current++;
        });
      }
    },
  });

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
        ) : items && items.length > 0 ? (
          <ProductForm items={items} />
        ) : (
          <S.EmptyListMessage>아직 구매 내역이 없습니다.</S.EmptyListMessage>
        )}
      </S.ProductContainer>
    </>
  );
};

export default PurchaseList;
