import React from 'react';
import * as S from '@/pages/ChatList/style';
import TopNavBar from '@/components/TopNavBar';
import NavBar from '@/components/NavBar';
import ChatForm from '@/components/ChatForm';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { restFetcher } from '@/queryClient';
import Loading from '@/components/Loading';
// import Chat from '@/components/Chat';

export default function ChatList() {
  const pageNo = 1;
  const pageSize = 5;


  try {
    const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } =
      useInfiniteQuery(
        ['chat'],
        ({ pageParam = `/chat/room?pageNo=${pageNo}&pageSize=${pageSize}` }) =>
          restFetcher({ method: 'GET', path: pageParam }),
        {
          getNextPageParam: (lastPage) => lastPage?.data.nextPage || undefined,
        },
      );

    if (isLoading) return <Loading />;
    return (
      <>
        <TopNavBar page="채팅 목록" />
        <NavBar />
        {isLoading ? (
          <Loading />
        ) : data && data.pages.flatMap((page) => page.data).length > 0 ? (
          <ChatForm items={data.pages.flatMap((page) => page.data)} />
        ) : (
          <S.EmptyList>채팅 목록이 없습니다.</S.EmptyList>
        )}
        {/* <Chat /> */}
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
