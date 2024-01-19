import React, { useEffect, useState } from 'react';
import * as S from '@/pages/SearchPage/styles';
import useSearchThing from '@/hooks/useSearchThing';
import { Product } from '@/types/product';
import useFetchProductList from '@/hooks/useFetchProductList';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';
import { restFetcher } from '@/queryClient';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
  const [thingName, handleThingName, _, onKeyDown] = useSearchThing('');
  const [isSearch, setIsSearch] = useState(false);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('search');
  const {
    data: productListData,
    isLoading: productListIsLoading,
    hasNextPage,
    fetchNextPage,
  } = useFetchProductList({
    path: '/products',
    queryKey: searchValue || '',
  });

  const { isFetching } = useInfiniteScroll({
    fetchCallback: async () => {
      if (hasNextPage) {
        await fetchNextPage();
      }
    },
  });

  console.log('thingName for search:', thingName); // Add this line
  const {
    data: searchData,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    isLoading: searchIsLoading,
    isFetching: searchIsFetching,
    isError: searchIsError,
    refetch: searchRefetch,
  } = useInfiniteQuery(['search', searchValue], ({ pageParam = 1 }) =>
    restFetcher({
      method: 'GET',
      path: `/products`,
      params: {
        pageNo: pageParam,
        pageSize: 5,
        search: encodeURIComponent(thingName),
      },
    })
      .then((res) => (res ? res.data : null))
      .catch((err) => {
        console.log(err);
      }),
  );
  useEffect(() => {
    if (thingName) {
      setIsSearch(true);
      searchRefetch();
    }
    if (!thingName) {
      setIsSearch(false);
    }
  }, [thingName]);

  return (
    <S.Container>
      <S.Nav>
        <S.Div>
          <S.Input
            placeholder="통합 검색"
            type="text"
            id="search"
            onChange={handleThingName}
            onKeyDown={onKeyDown}
            value={thingName}
          ></S.Input>
          <div>
            {searchData?.pages
              ?.map((pageData) =>
                pageData?.data
                  ? pageData.data.map((searchItem: Product) => (
                      <ProductForm
                        key={searchItem.productId}
                        items={[
                          {
                            productId: searchItem.productId,
                            title: searchItem.title,
                            thumbnailURL: searchItem.thumbnailURL,
                            name: searchItem.name,
                            price: searchItem.price,
                            createdAt: searchItem.createdAt,
                            productState: searchItem.productState,
                            likes: searchItem.likes,
                            views: searchItem.views,
                          },
                        ]}
                      />
                    ))
                  : [],
              )
              .flat()}
          </div>
        </S.Div>
      </S.Nav>
      {isFetching && <Loading />} {/* Show loading indicator during infinite scroll */}
    </S.Container>
  );
};

export default SearchPage;
