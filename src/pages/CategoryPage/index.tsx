// CategoryPage 컴포넌트
import React from 'react';
import * as S from './styles';
import useFetchProductList from '@/hooks/useFetchProductList';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';
import TopNavBar from '@/components/TopNavBar';
import { useParams } from 'react-router-dom';
import { mainCategory } from '@/constants/mainCategory';

const index: React.FC = () => {
  const { categoryId } = useParams();
  const path = `/category/list/${categoryId}`,
    queryKey = `${categoryId}`;
  const { data, isLoading, hasNextPage, fetchNextPage } = useFetchProductList({ path, queryKey });
  const selectedCategory = mainCategory.find((category) => category.id.toString() === categoryId);
  const selectedTitle = selectedCategory ? selectedCategory.title : '';
  useInfiniteScroll({ fetchCallback: fetchNextPage });

  return (
    <>
      <TopNavBar page={selectedTitle} />
      <S.ProductContainer>
        {isLoading ? (
          <Loading />
        ) : data && data?.pages.flatMap((page) => page.data).length > 0 ? (
          <ProductForm items={data?.pages.flatMap((page) => page?.data)} />
        ) : (
          <S.EmptyList>상품 목록이 없습니다.</S.EmptyList>
        )}
      </S.ProductContainer>
    </>
  );
};
export default index;
