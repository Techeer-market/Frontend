import Heart from '../../assets/grayHeartIcon.svg';
import FilledHeart from '../../assets/likedHeart.svg';
import Chat from '../../assets/chatIcon.svg';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import * as S from './styles';
import { restFetcher } from '@/queryClient';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ko from 'date-fns/locale/ko';

interface ProductProps {
  items: Product[];
}

const ProductForm: React.FC<ProductProps> = ({ items }) => {
  const location = useLocation();
  const isWishPage = location.pathname === '/wishlist';
  const isSalsePage = location.pathname === '/saleslist';

  const [products, setProducts] = useState<Product[]>(items);
  const [dropDown, setDropDown] = useState<string>('');
  const [fadeOutProductUuids, setFadeOutProductUuids] = useState<string[]>([]);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  // 페이드 아웃 핸들러
  const fadeOutHandler = (productUuid: string, callback: () => void) => {
    setFadeOutProductUuids((prev) => [...prev, productUuid]);

    setTimeout(() => {
      callback();
    }, 300);
  };

  // 좋아요 상태 업데이트
  const updateLikedByUuid = (productUuid: string, userHasLiked: boolean) => {
    return products.map((item) =>
      item.productUuid === productUuid
        ? {
            ...item,
            userHasLiked: !userHasLiked,
            likeCount: userHasLiked ? item.likeCount - 1 : item.likeCount + 1,
          }
        : item,
    );
  };

  // 좋아요 버튼 핸들러
  const likedHandler = async ({ productUuid, userHasLiked }: Product) => {
    try {
      if (userHasLiked) {
        // 좋아요 취소
        try {
          await restFetcher({
            method: 'DELETE',
            path: `/products/like/${productUuid}`,
          });
        } catch (error) {
          console.error(error);
        }

        if (isWishPage) {
          fadeOutHandler(productUuid, () => {
            const updatedItems = products.filter((item) => item.productUuid !== productUuid);
            setProducts(updatedItems);
          });
        } else {
          const updatedItems = updateLikedByUuid(productUuid, true);
          setProducts(updatedItems);
        }
      } else {
        // 좋아요 누르기
        await restFetcher({
          method: 'POST',
          path: `/products/like/${productUuid}`,
        });

        const updatedItems = updateLikedByUuid(productUuid, false);
        setProducts(updatedItems);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다.', error);
    }
  };

  // 상품 상태 변경 핸들러
  const changeStateHandler = async (product: Product) => {
    try {
      let newState: 'SALE' | 'RESERVED' | 'SOLD';
      newState = product.productState !== 'SOLD' ? 'SOLD' : 'SALE';

      await restFetcher({
        method: 'PUT',
        path: `/products/${product.productUuid}/${product.productState}/state`,
        body: { state: newState },
      });

      const updatedItems = products.map((item) =>
        item.productUuid === product.productUuid ? { ...item, productState: newState } : item,
      );
      setProducts(updatedItems);
    } catch (error) {
      console.log('상품 상태 변경 중 오류가 발생했습니다.', error);
    }
  };

  // 삭제 버튼 핸들러
  const deleteHandler = async (productUuid: string) => {
    try {
      await restFetcher({
        method: 'DELETE',
        path: `/products/${productUuid}`,
      });
      fadeOutHandler(productUuid, () => {
        const updatedItems = products.filter((item) => item.productUuid !== productUuid);
        setProducts(updatedItems);
      });
    } catch (error) {
      console.error('상품 삭제 중 오류가 발생했습니다.', error);
    }
  };

  // 날짜 포매팅
  const formatDateToNow = (dateString: string) => {
    const date = new Date(dateString);
    let formattedDate = formatDistanceToNow(date, { addSuffix: true, locale: ko });
    formattedDate = formattedDate.replace('약 ', '');
    return formattedDate;
  };

  return (
    <S.Div>
      {products?.map((item, index) => (
        <S.Container
          key={item.productUuid}
          className={fadeOutProductUuids.includes(item.productUuid) ? 'fade-out' : ''}
        >
          <S.ProductContent>
            <S.ImageDiv style={{ backgroundImage: `url(${item.image_url_1})` }} />
            <S.TextDiv>
              <div>
                <S.TitleDiv>{item.title}</S.TitleDiv>
                <S.InfoDiv>
                  <S.InfoContent>{item.name}</S.InfoContent>
                  <S.InfoContent>{formatDateToNow(item.date)}</S.InfoContent>
                </S.InfoDiv>
              </div>
              <S.PriceDiv>{Number(item.price).toLocaleString()}원</S.PriceDiv>
            </S.TextDiv>

            <S.Section>
              <S.Part>
                <S.Image
                  style={{ backgroundImage: `url(${item.userHasLiked ? FilledHeart : Heart})` }}
                  onClick={() => {
                    likedHandler(item);
                  }}
                />
                <S.Value>{item.likeCount}</S.Value>
              </S.Part>
              <S.Part>
                <S.Image style={{ backgroundImage: `url(${Chat})` }} />
                <S.Value>{item.chatroomCount}</S.Value>
              </S.Part>
              {/* 판매 내역 페이지일 경우에만 보이도록 함 */}
              {isSalsePage && (
                <S.MenuBar
                  onClick={() => {
                    setDropDown(dropDown === item.productUuid ? '' : item.productUuid);
                  }}
                >
                  <S.Circle />
                </S.MenuBar>
              )}
              {dropDown === item.productUuid && (
                <S.Dropdown>
                  <S.DropdownItem
                    onClick={() => {
                      changeStateHandler(item);
                    }}
                  >
                    {item.productState !== 'SOLD' ? '거래 완료로 변경' : '판매 중으로 변경'}
                  </S.DropdownItem>
                  <S.DropdownItem>게시글 수정</S.DropdownItem>
                  <S.DropdownItem onClick={() => deleteHandler(item.productUuid)}>
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
