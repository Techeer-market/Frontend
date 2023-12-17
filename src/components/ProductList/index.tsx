import useFetchProductList from '@/hooks/useFetchProductList';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loading from '@/components/Loading';
import { Product } from '@/types/product';

const ProductList = () => {
  const { categoryId } = useParams();
  const { data, isLoading, hasNextPage, fetchNextPage } = useFetchProductList({
    path: `/category/${categoryId}`,
    queryKey: `category_${categoryId}`,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.data.map((product: Product) => (
            <div key={product.id}>
              {product.title}
              {product.chatroomCount}
            </div>
          ))}
        </React.Fragment>
      ))}
      {hasNextPage && (
        <button onClick={fetchNextPage} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default ProductList;
