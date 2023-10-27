import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './styles';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '@/components/ProductForm'
import { Product } from '@/types/product'
import { BASE_URL } from '@/constants/baseURL';

const SalesList: React.FC = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tabClickHandler = (index: number) => {
    setActiveIndex(index);
  }

  const fetchSalseList = useCallback (async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/mypage/sell`);
      if(res.data) {
        const chatroomCountPromises = res.data.map((product: Product) =>
          axios.get(`${BASE_URL}/chatroom/count/${product.productUuid}`)
        );
        const chatroomCounts = await Promise.all(chatroomCountPromises);
        const updatedProducts = res.data.map((product: Product, index: number) => ({
          ...product,
          chatroomCount: chatroomCounts[index].data
        }));
        setItems(updatedProducts);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSalseList();
  }, []);

  // 판매중, 거래 완료 상품 분류
  const onSaleItems = items.filter(item => item.productState !== 'SOLD');
  const completedItems = items.filter(item => item.productState === 'SOLD');

  let displayedItems = activeIndex === 0 ? onSaleItems : completedItems;

  return (
    <>
      <TopNavBar page='나의 판매 내역'/>
      <S.BtnDiv>
        <S.WriteBtn>글쓰기</S.WriteBtn>
      </S.BtnDiv>

      <S.Tabs>
        <S.Tab isActive = {activeIndex === 0} onClick={()=>tabClickHandler(0)}> 판매 중 </S.Tab>
        <S.Tab isActive = {activeIndex === 1} onClick={()=>tabClickHandler(1)}> 거래 완료 </S.Tab>
      </S.Tabs>

      <S.TabContent>
        { isLoading ? 
          <div>로딩 중...</div> // 로딩중 뷰 추가 예정
          :  <ProductForm items={displayedItems} refreshProductList={fetchSalseList}/> 
        }
      </S.TabContent>
    </>
  );
};

export default SalesList;