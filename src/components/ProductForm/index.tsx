import Heart from '../../assets/grayHeartIcon.svg'
import Chat from '../../assets/chatIcon.svg'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import * as S from './styles';

interface Product {
  title: string;
  price: number;
  image_url_1: string;
}

interface ProductProps {
  items: Product[];
}

const ProductForm: React.FC<ProductProps> = ({ items }) => {
  const location = useLocation();
  const isSalsePage = location.pathname === '/saleslist';

  const [dropDown, setDropDown] = useState<number | null>(null);

  return (
    <S.Div>
        {items.map((item, index) => (
        <S.Container key={index}>
            <S.ProductContent>
                <S.ImageDiv style={{ backgroundImage: `url(${item.image_url_1})` }} />
                <S.TextDiv>
                    <div>
                        <S.TitleDiv>{item.title}</S.TitleDiv>
                        <S.InfoDiv>
                            <S.InfoContent>(이름)</S.InfoContent> <S.InfoContent>3일전</S.InfoContent>
                        </S.InfoDiv>
                    </div>
                    <S.PriceDiv>{Number(item.price).toLocaleString()}원</S.PriceDiv>
                </S.TextDiv>

                <S.Section>
                    <S.Part>
                        <S.Image style={{backgroundImage: `url(${Heart})`}}/>
                        <S.Value>4</S.Value>
                    </S.Part>
                    <S.Part>
                        <S.Image style={{backgroundImage: `url(${Chat})`}} />
                        <S.Value>5</S.Value>
                    </S.Part>
                    {/* 판매 내역 페이지일 경우에만 보이도록 함 */}
                    {isSalsePage && <S.MenuBar onClick={() => {setDropDown(dropDown === index ? null : index)}}><S.Circle/></S.MenuBar>}
                    {dropDown === index && 
                        <S.Dropdown>
                            <S.DropdownItem>거래 완료로 변경</S.DropdownItem>
                            <S.DropdownItem>게시글 수정</S.DropdownItem>
                            <S.DropdownItem>삭제</S.DropdownItem>
                        </S.Dropdown>
                    }
                </S.Section>
            </S.ProductContent>
        </S.Container>
        ))}
    </S.Div>
  );
};

export default ProductForm;