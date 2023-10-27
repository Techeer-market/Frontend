import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '@/components/ProductForm';
import TopNavBar from '@/components/TopNavBar';
import * as S from './styles';
import { Product } from '@/types/product';
import { BASE_URL } from '@/constants/baseURL';

const WishList: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 좋아요를 누른 상품 리스트 불러오는 함수
  const fetchWishList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/mypage/like`);
      if (response.data) {
        // 각 상품마다 채팅방 개수 가져오는 Promise 배열 생성
        const chatroomCountPromises = response.data.map((product: Product) =>
          axios.get(`${BASE_URL}/chatroom/count/${product.productUuid}`),
        );

        const chatroomCounts = await Promise.all(chatroomCountPromises);

        const updatedProducts = response.data.map((product: Product, index: number) => ({
          ...product,
          chatroomCount: chatroomCounts[index].data,
        }));

        setItems(updatedProducts);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWishList();
  }, []);

  return (
    <>
      <TopNavBar page="좋아요 목록" />

      <S.ProductContainer>
        {isLoading ? (
          <div>로딩 중...</div> // 로딩중 뷰 추가 예정
        ) : (
          <ProductForm items={items} refreshProductList={fetchWishList} />
        )}
      </S.ProductContainer>
    </>
  );
};

export default WishList;