import React, { useEffect, useState } from 'react';
import * as S from '@/pages/SearchPage/styles';
import useSearchThing from '@/hooks/useSearchThing';
import { useInfiniteQuery } from '@tanstack/react-query';
import ProductForm from '@/components/ProductForm';
import Loading from '@/components/Loading';
import { QueryKeys, restFetcher } from '@/queryClient';
import { useLocation, useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import { SearchData, SearchResponse } from '@/types/search';

type LocationState = {
  thingName: string;
} | null;

export default function SearchPage() {
  const location = useLocation();
  const thingName = (location.state as LocationState)?.thingName || null;
  const [isSearch, setIsSearch] = useState(false);
  const pageNo = 1;
  const pageSize = 5;

  const queryKeys = thingName ? [QueryKeys.SEARCH, thingName] : [QueryKeys.RESULT];

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } =
    useInfiniteQuery(
      queryKeys,
      ({ pageParam = `/products?pageNo=${pageNo}&pageSize=${pageSize}&search=${thingName}` }) =>
        restFetcher({ method: 'GET', path: pageParam }),
      {
        getNextPageParam: (lastPage) => lastPage?.data.nextPage || undefined,
      },
    );

  useEffect(() => {
    if (thingName) {
      setIsSearch(true);
    }
  }, [thingName]);

  if (isLoading) return <Loading />;
  return (
    <>
      <SearchBar />
      <S.ProductContainer>
        {isLoading ? (
          <Loading />
        ) : data && data.pages.flatMap((page) => page.data).length > 0 ? (
          <ProductForm items={data.pages.map((page) => page.data).flat()} />
        ) : (
          <S.EmptyList>검색 목록이 없습니다.</S.EmptyList>
        )}
      </S.ProductContainer>
    </>
  );
}
