import { Product } from '@/types/product';
import { restFetcher } from '@/queryClient';
import { useInfiniteQuery } from '@tanstack/react-query';

interface FetchProductListProps {
  path: string;
  queryKey: string;
}

const PAGE_SiZE = 10;

const useFetchProductList = ({ path, queryKey }: FetchProductListProps) => {
  const fetchWishList = async ({ pageParam = 1 }) => {
    try {
      const response = await restFetcher({
        method: 'GET',
        path: path,
        params: { pageNo: pageParam, pageSize: PAGE_SiZE },
      });

      const products = response.data.map((item: Product) => item);

      // const productsWithChatroomCounts = await Promise.all(
      //   response.data.map(async (product: Product) => {
      //     const chatroomResponse = await restFetcher({
      //       method: 'GET',
      //       path: `/chatroom/count/${product.productId}`,
      //     });
      //     return { ...product, chatroomCount: chatroomResponse.data };
      //   }),
      // );

      // return {
      //   data: productsWithChatroomCounts,
      //   nextPage: response.data.length ? pageParam + 1 : undefined,
      // };
      return { data: products, nextPage: response.data.length ? pageParam + 1 : undefined };
    } catch (error) {
      return { data: [], nextPage: undefined };
    }
  };

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [`${queryKey}`],
    ({ pageParam = 1 }) => fetchWishList({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage?.data ? lastPage.nextPage : undefined;
      },
    },
  );

  const loadMore = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return { data, isLoading, hasNextPage, fetchNextPage: loadMore };
};

export default useFetchProductList;
