import React, { useEffect, useState } from 'react';
import * as S from '@/pages/SearchPage/styles';
import backBtn from '@/assets/backBtn.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { QueryKeys, restFetcher } from '@/queryClient';
import useSearchThing from '@/hooks/useSearchThing';
import { SearchResponse } from '@/types/search';
import Loading from '@/components/Loading';
import InfiniteScroll from 'react-infinite-scroller';
import ProductForm from '@/components/ProductForm';

const SearchPage = () => {
  const navigate = useNavigate();
  const [thingName, handleThingName, goToMain, onKeyDown] = useSearchThing('');
  const [isSearch, setIsSearch] = useState(false);
  const {
    data: searchData,
    fetchNextPage: searchFetchNextPage,
    hasNextPage: searchHasNextPage,
    isLoading: searchIsLoading,
    isFetching: searchIsFetching,
    isError: searchIsError,
    refetch: searchRefetch,
  } = useInfiniteQuery<SearchResponse, Error>(
    [QueryKeys.SEARCH],
    ({ pageParam = `/search=${thingName}` }) =>
      restFetcher({
        method: 'GET',
        path: pageParam,
      }),
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

  if (searchIsLoading) {
    <Loading />;
  }
  if (searchIsError) return <div>Error!</div>;

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
                {searchData?.pages
                  .map((pageData) =>
                    pageData.data.map((searchItem, index) => ({
                      productId: searchItem.productId,
                      title: searchItem.title,
                      thumbnailURL: searchItem.thumbnailURL,
                      name: searchItem.name,
                      price: searchItem.price,
                      createdAt: searchItem.createdAt,
                      likes: searchItem.likes,
                      views: searchItem.views,
                      // 추가로 필요한 속성들
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
