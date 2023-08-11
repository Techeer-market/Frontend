import NavBar from '@/components/NavBar';
import ProductList from '@/components/ProductList';
import * as S from './styles';

const index = () => {
  return (
    <S.MainDiv>
      <NavBar />
      <S.MainContainer className="list">
        <S.TextDiv>
          <S.KorText>방금 올라온 상품이에요 !</S.KorText>
          <S.TextLine />
        </S.TextDiv>
        <S.ProductDiv className="list-item">
          <ProductList />
        </S.ProductDiv>
      </S.MainContainer>
    </S.MainDiv>
  );
};

export default index;
