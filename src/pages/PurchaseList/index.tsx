import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styles';
import axios, { AxiosResponse } from 'axios';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '../../components/ProductForm';
import { Product } from '@/types/product';
import { BASE_URL } from '@/constants/baseURL';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Loading from '@/components/Loading';

const PurchaseList: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const idx = useRef<number>(1);

  const fetchPurchaseList = async () => {
    try {
      const nextPage = idx.current;
      idx.current++;

      const response = await axios.get(`${BASE_URL}/mypage/purchase`, {
        params: { pageNo: nextPage, pageSize: 5 },
      });
      if (response.data) {
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

  const { isFetching } = useInfiniteScroll({ fetchCallback: fetchPurchaseList });

  useEffect(() => {
    fetchPurchaseList();
  }, []);

  return (
    <>
      <TopNavBar page="나의 구매 내역" />
      <S.BtnDiv>
        <S.WriteBtn>글쓰기</S.WriteBtn>
      </S.BtnDiv>

      <S.ProductContainer>
        {isLoading && !isFetching ? (
          <Loading />
        ) : (
          <ProductForm items={items} refreshProductList={fetchPurchaseList} />
        )}
      </S.ProductContainer>
    </>
  );
};

export default PurchaseList;
