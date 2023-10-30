import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import { Product } from '@/types/product';
import { BASE_URL } from '@/constants/baseURL';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const WishList: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idx = useRef<number>(1);

  // 좋아요를 누른 상품 리스트 불러오는 함수
  const fetchWishList = async () => {
    try {
      const nextPage = idx.current;
      idx.current++;

      // pageNo → 1부터 시작 , pageSize → 한페이지에 들어가는 게시물 수
      const response = await axios.get(`${BASE_URL}/mypage/like`, {
        params: { pageNo: nextPage, pageSize: 5 },
      });

      if (Array.isArray(response.data) && response.data) {
        // 각 상품마다 채팅방 개수 가져오는 Promise 배열 생성
        const chatroomCountPromises = response.data.map((product: Product) =>
          axios.get(`${BASE_URL}/chatroom/count/${product.productUuid}`),
        );

        const chatroomCounts = await Promise.all(chatroomCountPromises);

        const updatedProducts = response.data.map((product: Product, index: number) => ({
          ...product,
          chatroomCount: chatroomCounts[index].data,
        }));

        setItems((prevItems) => [...prevItems, ...updatedProducts]);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const { isFetching } = useInfiniteScroll({ fetchCallback: fetchWishList });

  useEffect(() => {
    fetchWishList();
  }, []);

  return (
    <>
      <TopNavBar page="좋아요 목록" />

      <S.ProductContainer>
        {isLoading && !isFetching ? (
          <div>로딩 중...</div> // 로딩중 뷰 추가 예정
        ) : (
          <ProductForm items={items} refreshProductList={fetchWishList} />
        )}
        {isFetching && <div>추가 항목 로딩 중...</div>}
      </S.ProductContainer>
    </>
  );
};

export default WishList;
