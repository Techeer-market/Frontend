import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import * as S from './styles';
import TopNavBar from '@/components/TopNavBar';
import ProductForm from '../../components/ProductForm'

interface Product {
  productUuid: string;
  title: string;
  image_url_1: string;
  productState: 'SALE' | 'RESERVED';
  tradeType: 'CoolDeal' | 'GeneralDeal';
  price: number;
}

const SalesList: React.FC = () => {
  const tradeTypeMap = {
    CoolDeal: '쿨거래',
    GeneralDeal: '일반거래',
  };

  const [items, setItems] = useState<Product[]>([]);
  const [userUuid, setUserUuid] = useState("");

  const [activeIndex, setActiveIndex] = useState(0);

  const tabClickHandler=( index: number )=>{
    setActiveIndex(index)
  }

  const fetchSalseList = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/mypage/sell");
      setItems(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [userUuid]); //성한님 코드에 따라 userUuid에 대한 의존성 추가


  // 판매중, 거래 완료 상품 분류
  const onSaleItems = items.filter(item => item.productState === 'SALE');
  const completedItems = items.filter(item => item.productState !== 'SALE');

  useEffect(() => {
    fetchSalseList();
  }, [fetchSalseList]);

  useEffect(() => {
    const uuid = localStorage.getItem('uuid');
    if(uuid){ 
        setUserUuid(uuid);
        fetchSalseList(); // UUID가 설정된 후에 items를 가져옵니다.
    }else{
        console.log("uuid 가 없습니다.")
    }
  }, []);

  return (
    <>
      <TopNavBar page='나의 판매 내역'/>
      <S.BtnDiv>
        <S.WriteBtn>글쓰기</S.WriteBtn>
      </S.BtnDiv>

      <S.Tabs>
        <S.Tab isActive={activeIndex === 0} onClick={()=>tabClickHandler(0)}> 판매 중 </S.Tab>
        <S.Tab isActive={activeIndex === 1} onClick={()=>tabClickHandler(1)}> 거래 완료 </S.Tab>
      </S.Tabs>

      <S.TabContent>
        { activeIndex === 0? (
            <ProductForm items={onSaleItems}/>
          ) : (
            <ProductForm items={completedItems}/>
          )
        }
      </S.TabContent>
    </>
  );
};

export default SalesList;