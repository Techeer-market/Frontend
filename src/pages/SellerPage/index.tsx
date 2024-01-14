import TopNavBar from '@/components/TopNavBar';
import { Product } from '@/types/product';
import * as S from './styles';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductForm from '@/components/ProductForm';
import { restFetcher } from '@/queryClient';
import Loading from '@/components/Loading';
import { useLocation } from 'react-router-dom';

interface ApiResponse {
  판매중: Product[];
  거래완료: Product[];
}

const SellerPage = () => {
  const location = useLocation();
  const { userId, name } = location.state;
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
  };

  const fetchSellerProductList = async () => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: `/mypage/sell/${userId}`,
      });

      return response.data;
    } catch (error) {
      return [];
    }
  };

  const { data, isLoading } = useQuery<ApiResponse, AxiosError>(['seller', userId], () =>
    fetchSellerProductList(),
  );

  const onSaleItems = data?.판매중 || [];
  const completedItems = data?.거래완료 || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <TopNavBar page={`${name}의 판매 내역`} />

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

export default SellerPage;
