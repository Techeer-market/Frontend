import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
      const res = await axios.get(`http://54.180.142.116:8080/api/products/my/${userUuid}`);
      setItems(res.data);
    } catch (error) {
      console.log(error);
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
      <BtnDiv>
        <WriteBtn>글쓰기</WriteBtn>
      </BtnDiv>

      <Tabs>
        <Tab isActive={activeIndex === 0} onClick={()=>tabClickHandler(0)}> 판매 중 </Tab>
        <Tab isActive={activeIndex === 1} onClick={()=>tabClickHandler(1)}> 거래 완료 </Tab>
      </Tabs>

      <TabContent>
        { activeIndex === 0? (
            <ProductForm items={onSaleItems}/>
          ) : (
            <ProductForm items={completedItems}/>
          )
        }
      </TabContent>
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

const Tabs = styled.ul`
  display: flex;
  padding: 6.2rem 3rem 0;
  list-style: none;
  cursor: pointer;
`;

const Tab = styled.li<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: ${props => (props.isActive ? '1px solid #000' : '0.5px solid #7A7676')};
  color: ${props => (props.isActive ? '#000' : ' #7A7676')};
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
`;

const TabContent = styled.div`
  padding: 2rem 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default SalesList;