import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '@/components/ProductForm';
import { Product } from '@/types/product';
import { restFetcher } from '@/queryClient';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const SalesList: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  };

  const { data: items, isLoading } = useQuery<Product[], AxiosError>(
    ['saleslist'],
    async () => {
      const response = await restFetcher({
        method: 'GET',
        path: '/mypage/sell',
      });
      return response.data;
    },
    {
      onSuccess: async (data) => {
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
      },
    },
  );

  // 판매중, 거래 완료 상품 분류
  const onSaleItems = items?.filter((item) => item.productState !== 'SOLD') || [];
  const completedItems = items?.filter((item) => item.productState === 'SOLD') || [];

  let displayedItems = activeIndex === 0 ? onSaleItems : completedItems;

  return (
    <>
      <TopNavBar page="나의 판매 내역" />
      <S.BtnDiv>
        <S.WriteBtn
          onClick={() => {
            navigate('/write');
          }}
        >
          글쓰기
        </S.WriteBtn>
      </S.BtnDiv>

      <S.Tabs>
        <S.Tab isActive={activeIndex === 0} onClick={() => tabClickHandler(0)}>
          판매 중
        </S.Tab>
        <S.Tab isActive={activeIndex === 1} onClick={() => tabClickHandler(1)}>
          거래 완료
        </S.Tab>
      </S.Tabs>

      <S.TabContent>
        {isLoading ? (
          <Loading />
        ) : displayedItems && displayedItems.length > 0 ? (
          <ProductForm items={displayedItems} />
        ) : (
          <S.EmptyList>
            {activeIndex === 0 ? '판매 중인 게시글이 없습니다.' : '거래 완료된 게시글이 없습니다.'}
          </S.EmptyList>
        )}
      </S.TabContent>
    </>
  );
};

export default SalesList;
