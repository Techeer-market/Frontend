import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TopNavBar from '@/components/TopNavBar';

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

  const getItems = useCallback(async () => {
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
    getItems();
  }, [getItems]);

  useEffect(() => {
    const uuid = localStorage.getItem('uuid');
    if(uuid){ 
        setUserUuid(uuid);
        getItems(); // UUID가 설정된 후에 items를 가져옵니다.
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

    </>
    // <MainDiv>
    //   <TopNavBar page='나의 판매 내역'/>
    //   <Wrap>
    //     <Saleslist>판매중인 상품</Saleslist>
    //     <MainContainer className="list">
    //       <Section1>
    //         <HeaderText>Registered Products</HeaderText>
    //         <KorText>판매 중</KorText>
    //         <ProductDiv>
    //           {items && items.map((item) => (
    //             <Div key={item.productUuid}>
    //               <PostLink to={`/post/${item.productUuid}`}>
    //                 <Image style={{ backgroundImage: `url(${item.image_url_1})` }} />
    //                 <TextDiv>
    //                   <Title>{item.title}</Title>
    //                   <TwoWrap>
    //                     {tradeTypeMap.hasOwnProperty(item.tradeType) && (
    //                       <TradeType>{tradeTypeMap[item.tradeType]}</TradeType>
    //                     )}
    //                     <Seller>(이름)</Seller>
    //                     {/* userUuid로 구현 */}
    //                   </TwoWrap>
    //                   <Price>{item.price}원</Price>
    //                 </TextDiv>
    //               </PostLink>
    //             </Div>
    //           ))}
    //         </ProductDiv>
    //         {/* <KorText>거래 완료</KorText> */}
    //       </Section1>
    //     </MainContainer>
    //   </Wrap>
    // </MainDiv>
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



// const PostLink = styled(Link)`
//   margin-right: 3rem;
//   text-decoration: none;
//   color: black;
// `;

// const MainDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     font-family:"LINESeedKRBd";
//     font-style: normal;
//     font-weight: 700;
// `;
// const Wrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
// const Saleslist = styled.h2` 
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin-top: 3.5rem;
//     padding-bottom: 6rem;
//     border-bottom: 0.07rem solid #000000;
//     width: 92.68rem;
//     font-size: 3rem;
//     line-height: 4.1rem;
//     font-weight: bold;
//     /* identical to box height */
//     color: #000000;
// `;
// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: start;
// `;
// const Section1 = styled.div`
//   margin-bottom: 2rem;
//   width: 92.68rem;
// `;
// const ProductDiv = styled.div`
//   display: grid;
//   width: 15rem;
//   grid-template-columns: repeat(5, 1fr);
//   gap: 1rem;
//   margin-bottom: 15px;
//   justify-content: space-between;
// `;
// const Div = styled.div`
//   margin-right: 3.41rem;
//   margin-bottom: 4rem;;
//   display: flex;
//   flex-direction: column;
// `;
// const Text1 = styled.div`
//   font-weight: 700;
//   font-size: 1.7rem;
// `
// const HeaderText = styled(Text1)`
//   font-size: 2rem;
//   padding-top: 2rem;
// `;
// const KorText = styled.div`
//   font-size: 1.5rem;
//   padding-bottom: 2rem;
//   margin: 0.3rem 0 2rem;
//   border-bottom: 0.07rem solid rgb(0, 0, 0);
// `;
// const Image = styled.div`
//   width: 15rem;
//   height: 18rem;
//   margin-bottom: 0.6rem;
//   background-color: #000;
//   cursor: pointer;
// `;
// const TextDiv = styled.div`
//   line-height: 2.2rem;
//   max-width: 15rem;
// `;
// const Title = styled(Text1)`
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   cursor: pointer;
// `;
// const Price = styled(Text1)`
// `;
// const TwoWrap = styled.div`
//   display: flex;
//   flex-direction: row;
// `
// const TradeType = styled.div`
//   color: #000;
//   margin-right: 1rem;
//   font-size: 1.3rem;
// `;
// const Seller = styled.div`
//   color: #D9D9D9;
//   font-size: 1.3rem;
// `;

export default SalesList;