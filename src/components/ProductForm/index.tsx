import styled from 'styled-components';

interface Product {
  title: string;
  price: number;
  image_url_1: string;
}

interface ProductProps {
  items: Product[];
}

const ProductForm: React.FC<ProductProps> = ({ items }) => {
  return (
    <MainDiv>
      <ProductList>
        {items.map((item, index) => (
          <ProductItem key={index}>
            <ImageDiv style={{ backgroundImage: `url(${item.image_url_1})` }} />
            <TextDiv>
              <TitleDiv>{item.title}</TitleDiv>
              <PriceDiv>{item.price}원</PriceDiv>
            </TextDiv>
            </ProductItem>
        ))}
      </ProductList>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 10px;
  max-width: 1080px;
  margin: 0 auto;
`;

const ProductItem = styled.div`
  margin-right: 10px;
  margin-bottom: 15px;
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 26.5rem;
  background-size: cover;
  cursor: pointer;
`;

const TextDiv = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 2.4rem;
  line-height: 29px;
`;

const TitleDiv = styled.div``;
const PriceDiv = styled.div``;

export default ProductForm;