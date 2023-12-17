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

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const fetchSalesList = async () => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: '/mypage/sell',
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

      return productsWithChatroomCounts;
    } catch (error) {
      return [];
    }
  };

  const { data, isLoading } = useQuery<Product[], AxiosError>(['saleslist'], () =>
    fetchSalesList(),
  );

  // 판매중, 거래 완료 상품 분류
  let onSaleItems = data?.filter((item) => item.productState !== 'SOLD') || [];
  let completedItems = data?.filter((item) => item.productState === 'SOLD') || [];

  if (isLoading) {
    return <Loading />;
  }

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
        <S.Tab isActive={activeIndex === 0} onClick={() => handleTabClick(0)}>
          판매 중
        </S.Tab>
        <S.Tab isActive={activeIndex === 1} onClick={() => handleTabClick(1)}>
          거래 완료
        </S.Tab>
      </S.Tabs>

      <S.TabContent>
        {activeIndex === 0 ? (
          onSaleItems && onSaleItems.length > 0 ? (
            <ProductForm items={onSaleItems} />
          ) : (
            <S.EmptyList>판매 중인 게시글이 없습니다.</S.EmptyList>
          )
        ) : completedItems && completedItems.length > 0 ? (
          <ProductForm items={completedItems} />
        ) : (
          <S.EmptyList>거래 완료된 게시글이 없습니다.</S.EmptyList>
        )}
      </S.TabContent>
    </>
  );
};

export default SalesList;
