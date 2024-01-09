import React, { useEffect, useState } from 'react';
import * as S from '@/pages/SearchPage/styles';
import backBtn from '@/assets/backBtn.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import useSearchThing from '@/hooks/useSearchThing';
import { SearchData, SearchResponse } from '@/types/search';
import Loading from '@/components/Loading';
import InfiniteScroll from 'react-infinite-scroller';
import ProductForm from '@/components/ProductForm';
import useFetchProductList from '@/hooks/useFetchProductList';

const SearchPage = () => {
  interface Product {
    id?: number;
    productId: string;
    title: string;
    thumbnailURL: string;
    name: string;
    price: number;
    createdAt: string;
    productState: 'SALE' | 'RESERVED' | 'SOLD';
    likes: number;
    views: number;
  }
  const navigate = useNavigate();
  const [thingName, handleThingName, goToMain, onKeyDown] = useSearchThing('');
  const [isSearch, setIsSearch] = useState(false);
  const {
    data: productListData,
    isLoading: productListIsLoading,
    hasNextPage: productListHasNextPage,
    fetchNextPage: productListFetchNextPage,
  } = useFetchProductList({ path: '/search', queryKey: thingName });
  const {
    data: searchData,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    isLoading: searchIsLoading,
    isFetching: searchIsFetching,
    isError: searchIsError,
    refetch: searchRefetch,
  } = useInfiniteQuery<SearchResponse, Error>(
    [thingName],
    ({ pageParam = `/search=${thingName}` }) =>
      restFetcher({
        method: 'GET',
        path: pageParam,
      }).then((res) => res.data),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
      staleTime: 0,
      cacheTime: 0,
    },
  );

  useEffect(() => {
    if (thingName) {
      setIsSearch(true);
      searchRefetch();
    }
    if (!thingName) setIsSearch(false);
  }, [thingName]);

  if (searchIsLoading || productListIsLoading) {
    return <Loading />;
  }
  if (searchIsError) {
    return <div>Error!</div>;
  }

  return (
    <S.Container>
      <S.Nav>
        <img
          id="back"
          alt="To Main"
          loading="lazy"
          src={backBtn}
          onClick={() => navigate('/')}
        ></img>
        <S.Div>
          <S.Input
            placeholder="통합 검색"
            type="text"
            id="search"
            onChange={handleThingName}
            onKeyDown={onKeyDown}
            value={thingName}
          ></S.Input>
          {isSearch ? (
            searchIsFetching ? (
              <Loading />
            ) : (
              <InfiniteScroll loadMore={() => searchFetchNextPage()} hasMore={searchHasNextPage}>
                {productListIsLoading ? (
                  <Loading />
                ) : productListData &&
                  productListData?.pages.flatMap((page) => page.data).length > 0 ? (
                  <ProductForm items={productListData?.pages.flatMap((page) => page?.data)} />
                ) : (
                  <S.EmptyList>상품 목록이 없습니다.</S.EmptyList>
                )}
                {searchData?.pages
                  .map((pageData) =>
                    pageData.data.map((searchItem: SearchData) => ({
                      productId: searchItem.productId,
                      title: searchItem.title,
                      thumbnailURL: searchItem.thumbnailURL,
                      name: searchItem.name,
                      price: searchItem.price,
                      createdAt: searchItem.createdAt,
                      productState: searchItem.productState,
                      likes: searchItem.likes,
                      views: searchItem.views,
                    })),
                  )
                  .flat()
                  .map((item, index) => (
                    <ProductForm key={index} items={[item]} />
                  ))}
              </InfiniteScroll>
            )
          ) : null}
        </S.Div>
      </S.Nav>
    </S.Container>
  );
};

export default SearchPage;
