import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styles';
import axios, { AxiosResponse } from 'axios';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '../../components/ProductForm'

interface Product {
  title: string;
  price: number;
  image_url_1: string;
}

const PurchaseList: React.FC  = () => {
    const { userId } = useParams(); // 유저 아이디를 URL 파라미터에서 가져옵니다.
    const [items, setItems] = useState<Product[]>([]);
    
    const fetchPurchaseList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/mypage/purchase");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchPurchaseList();
    }, []);

  return (
    <>
      <TopNavBar page="나의 구매 내역"/>
      <S.BtnDiv>
        <S.WriteBtn>글쓰기</S.WriteBtn>
      </S.BtnDiv>

      <S.ProductContainer>
        <ProductForm items={items}/>
      </S.ProductContainer>
    </>
  );
};

export default PurchaseList;