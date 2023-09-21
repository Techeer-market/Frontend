import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';
// import ProductList from '../../components/ProductList'
import TopNavBar from '@/components/TopNavBar';

interface Item {
  title: string;
  price: number;
  image: string;
}

const PurchaseList: React.FC  = () => {
    const { userId } = useParams(); // 유저 아이디를 URL 파라미터에서 가져옵니다.
    const [items, setItems] = useState<Item[]>([]);
    
    const fetchPurchaseList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/purchase-products`);
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
      <BtnDiv>
        <WriteBtn>글쓰기</WriteBtn>
      </BtnDiv>

      <ProductContainer>
        {/* <ProductList/> */}
      </ProductContainer>
    </>
  );
};

const BtnDiv = styled.div`
  padding: 2.8rem 2.2rem 0;
`

const WriteBtn = styled.button`
  width: 106px;
  height: 35px;
  appearance: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  border-radius: 10px;
  background: #FD8944;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
`

const ProductContainer = styled.div`
  padding: 4.3rem 5rem 0;
`

export default PurchaseList;