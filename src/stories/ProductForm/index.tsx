import Heart from '@/assets/grayHeartIcon.svg';
import FilledHeart from '@/assets/likedHeart.svg';
import Chat from '@/assets/chatIcon.svg';
import Circle from '@/assets/circle.svg';
import { useState } from 'react';
import { Product } from '@/types/product';
import * as S from './styles';
import { formatDateToNow } from '@/utils/formatDateToNow';

interface ProductProps {
  items: Product[];
  state?: string;
  location: string;
}

const ProductForm = ({ items, state, location }: ProductProps) => {
  const [dropDown, setDropDown] = useState<number>(0);

  const isWishPage = location === '/wishlist';
  const isSalsePage = location === '/saleslist';

  return (
    <S.Div>
      {items?.map((item) => (
        <S.Container key={item.productId}>
          <S.ProductContent>
            <S.ImageDiv style={{ backgroundImage: `url(${item.thumbnailURL})` }} />
            <S.TextDiv>
              <div>
                <S.TitleDiv>{item.title}</S.TitleDiv>
                <S.InfoDiv>
                  <S.InfoContent>{item.name}</S.InfoContent>
                  <S.InfoContent>{formatDateToNow(item.createdAt)}</S.InfoContent>
                </S.InfoDiv>
              </div>
              <S.PriceDiv>{Number(item.price).toLocaleString()}원</S.PriceDiv>
            </S.TextDiv>

            <S.Section>
              <S.Part>
                <S.Image style={{ backgroundImage: `url(${isWishPage ? FilledHeart : Heart})` }} />
                <S.Value>{item.likes}</S.Value>
              </S.Part>
              <S.Part>
                <S.Image style={{ backgroundImage: `url(${Chat})` }} />
                <S.Value>{item.views}</S.Value>
              </S.Part>
              {/* 판매 내역 페이지일 경우에만 보이도록 함 */}
              {isSalsePage && (
                <S.MenuBar
                  onClick={(event) => {
                    event.stopPropagation(); // 이벤트 버블링 방지
                    setDropDown(dropDown === item.productId ? 0 : item.productId);
                  }}
                >
                  <S.Image style={{ backgroundImage: `url(${Circle})` }} />
                </S.MenuBar>
              )}
              {dropDown === item.productId && (
                <S.Dropdown>
                  <S.DropdownItem>
                    {state !== 'SOLD' ? '거래 완료로 변경' : '판매 중으로 변경'}
                  </S.DropdownItem>
                  <S.DropdownItem>게시글 수정</S.DropdownItem>
                  <S.DropdownItem>삭제</S.DropdownItem>
                </S.Dropdown>
              )}
            </S.Section>
          </S.ProductContent>
        </S.Container>
      ))}
    </S.Div>
  );
};

export default ProductForm;
