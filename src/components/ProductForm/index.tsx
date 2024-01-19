import Heart from '../../assets/grayHeartIcon.svg';
import FilledHeart from '../../assets/likedHeart.svg';
import Chat from '../../assets/chatIcon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import * as S from './styles';
import { getClient, restFetcher } from '@/queryClient';
import { useMutation } from '@tanstack/react-query';
import { formatDateToNow } from '@/utils/formatDateToNow';

interface ProductProps {
  items: Product[];
  state?: string;
}

const ProductForm = ({ items, state }: ProductProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = getClient();
  const [dropDown, setDropDown] = useState<string>('');

  const isWishPage = location.pathname === '/wishlist';
  const isSalsePage = location.pathname === '/saleslist';

  const mutateChangeProductState = useMutation(
    (product: Product) => {
      let newState = state === 'SOLD' ? 'SALE' : 'SOLD';
      return restFetcher({
        method: 'PUT',
        path: `/products/state/${product.productId}`,
        body: { state: newState },
      });
    },
    {
      onSuccess: (_, product) => {
        queryClient.invalidateQueries(['saleslist']);
      },
      onError: (error: any) => {
        alert('상품 상태 변경에 실패했습니다. 다시 시도해주세요.');
      },
    },
  );

  // 상품 상태 변경 핸들러 (판매 내역 페이지)
  const handleChangeState = async (product: Product) => {
    await mutateChangeProductState.mutateAsync(product);
  };

  const mutateDeleteProduct = useMutation(
    (productId: string) =>
      restFetcher({
        method: 'DELETE',
        path: `/products/${productId}`,
      }),
    {
      onSuccess: (_, productId) => {
        queryClient.invalidateQueries(['saleslist']);
      },
      onError: (error) => {
        alert('상품 삭제에 실패했습니다. 다시 시도해주세요.');
      },
    },
  );

  // 삭제 버튼 핸들러 (판매 내역 페이지)
  const handleDelete = async (productId: string) => {
    await mutateDeleteProduct.mutateAsync(productId);
  };

  return (
    <S.Div>
      {items?.map((item) => (
        <S.Container key={item.productId} onClick={() => navigate(`/item/${item.productId}`)}>
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
              {/* <S.Part> */}
              <S.Image style={{ backgroundImage: `url(${Chat})` }} />
              {/* <S.Value>{item.chatroomCount}</S.Value> */}
              {/* </S.Part> */}
              {/* 판매 내역 페이지일 경우에만 보이도록 함 */}
              {isSalsePage && (
                <S.MenuBar
                  onClick={(event) => {
                    event.stopPropagation(); // 이벤트 버블링 방지
                    setDropDown(dropDown === item.productId ? '' : item.productId);
                  }}
                >
                  <S.Circle />
                </S.MenuBar>
              )}
              {dropDown === item.productId && (
                <S.Dropdown>
                  <S.DropdownItem
                    onClick={(event) => {
                      event.stopPropagation(); // 이벤트 버블링 방지
                      handleChangeState(item);
                    }}
                  >
                    {state !== 'SOLD' ? '거래 완료로 변경' : '판매 중으로 변경'}
                  </S.DropdownItem>
                  <S.DropdownItem
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate('/edit_post'); // 게시글 수정 페이지 (url 수정 필요)
                    }}
                  >
                    게시글 수정
                  </S.DropdownItem>
                  <S.DropdownItem
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(item.productId);
                    }}
                  >
                    삭제
                  </S.DropdownItem>
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
