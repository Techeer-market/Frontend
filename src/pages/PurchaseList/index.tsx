import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '../../components/ProductForm';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Loading from '@/components/Loading';
import useFetchProductList from '@/hooks/useFetchProductList';

const PurchaseList: React.FC = () => {
  const navigate = useNavigate();
  const path = '/mypage/purchase',
    queryKey = 'purchaselist';
  const { data, isLoading, hasNextPage, fetchNextPage } = useFetchProductList({ path, queryKey });

  useInfiniteScroll({ fetchCallback: fetchNextPage });

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
        ) : data && data?.pages.flatMap((page) => page.data).length > 0 ? (
          <ProductForm items={data?.pages.flatMap((page) => page.data)} />
        ) : (
          <S.EmptyListMessage>구매 내역이 없습니다.</S.EmptyListMessage>
        )}
      </S.ProductContainer>
    </>
  );
};

export default PurchaseList;
