import * as S from '@/pages/ChatList/style';
import TopNavBar from '@/components/TopNavBar';
import NavBar from '@/components/BottomNavBar';
import ChatForm from '@/components/ChatForm';
import Loading from '@/components/Loading';
import useFetchProductList from '@/hooks/useFetchProductList';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export default function ChatList() {
  const path = '/chat/room',
    queryKey = 'chat';
  const { data, isLoading, fetchNextPage } = useFetchProductList({ path, queryKey });
  useInfiniteScroll({ fetchCallback: fetchNextPage });

  if (isLoading) return <Loading />;
  return (
    <>
      <TopNavBar page="채팅 목록" />
      {isLoading ? (
        <Loading />
      ) : data && data?.pages.flatMap((page) => page.data).length > 0 ? (
        <ChatForm items={data?.pages.flatMap((page) => page.data)} />
      ) : (
        <S.EmptyList>채팅 목록이 없습니다.</S.EmptyList>
      )}
    </>
  );
}
