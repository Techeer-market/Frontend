// CategoryPage 컴포넌트
import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchProductList from '@/hooks/useFetchProductList';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';
import * as S from './styles';

const index: React.FC = () => {
  const { categoryId } = useParams();
  const path = `/list/category/${categoryId}`,
    queryKey = 'categoryId';
  const { data, isLoading, hasNextPage, fetchNextPage } = useFetchProductList({ path, queryKey });

  useInfiniteScroll({ fetchCallback: fetchNextPage });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : data && data?.pages.flatMap((page) => page.data).length > 0 ? (
        <ProductForm items={data?.pages.flatMap((page) => page?.data)} />
      ) : (
        <S.EmptyList>상품 목록이 없습니다.</S.EmptyList>
      )}
    </div>
  );
};
export default index;
