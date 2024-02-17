import React, { useEffect, useState } from 'react';
import * as S from '@/pages/SearchPage/styles';
import useSearchThing from '@/hooks/useSearchThing';
import { Product } from '@/types/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';
import { QueryKeys, restFetcher } from '@/queryClient';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchResponse } from '@/types/search';
import SearchBar from '@/components/SearchBar';

type LocationState = {
  thingName: string;
} | null;

export default function SearchPage() {
  const location = useLocation();
  const thingName = (location.state as LocationState)?.thingName || null;
  const [handleThingName, onKeyDown] = useSearchThing('');
  const [isSearch, setIsSearch] = useState(false);
  // const [searchParams] = useSearchParams();
  // const searchValue = searchParams.get('search');

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } =
    useInfiniteQuery<SearchResponse,Error>(
      [QueryKeys.RESULT],
      ({ pageParam = '/products/list' }) => restFetcher({ method: 'GET', path: pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage. || undefined,
      },
    );

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
    ({ pageParam = `/products?pageNo=1&pageSize=5&search=${thingName}` }) =>
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

  if (isLoading || searchIsLoading) return <Loading />;
  if (isError || searchIsError) return <div>{error?.toString()}</div>;

  return <SearchBar />;
}
