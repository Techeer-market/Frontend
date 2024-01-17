import { Link, useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import * as S from './styles';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import TopNavBar from '@/components/TopNavBar';
import KakaoMap from '@/components/KakaoMap';
import Heart from '../../assets/grayHeartIcon.svg';
import FilledHeart from '../../assets/likedHeart.svg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getClient, restFetcher } from '@/queryClient';
import Loading from '@/components/Loading';
import { formatDateToNow } from '@/utils/formatDateToNow';
import Carousel from '@/components/Carousel';

interface ItemDetailProps {
  productId: string;
  productImages: string[];
  name: string; //writer
  userId: string;
  categoryName: string;
  title: string;
  content: string;
  price: number;
  productState: 'SALE' | 'RESERVED' | 'SOLD';
  likes: number;
  myheart: boolean; // 좋아요 여부, 이름 수정 필요
  views: number;
  createdAt: string;
  location: string;
  updatedAt: string;
  // chatroomCount: number;
}

const ItemDetail: React.FC = () => {
  const { productId } = useParams();
  const queryClient = getClient();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<ItemDetailProps, AxiosError>(
    ['itemDetail', productId],
    async () => {
      const response = await restFetcher({
        method: 'GET',
        path: `/products/list/${productId}`,
      });
      return response.data;
    },
    {
      onError: (error) => {
        console.error(error);
      },
      // 자동 리프레시 비활성화
      refetchOnWindowFocus: false,
    },
  );

  // 좋아요 상태 업데이트 (heart: 현재 좋아요 상태)
  const updateLike = (productId: string) => {
    queryClient.invalidateQueries(['itemDetail', productId]);
  };
  // 좋아요 취소 mutation
  const deleteLikeMutation = useMutation(
    (productId: string) =>
      restFetcher({
        method: 'DELETE',
        path: `/products/like/${productId}`,
      }),
    {
      onSuccess: (_, productId) => {
        updateLike(productId);
      },
      onError: (error) => {
        console.error('좋아요 취소 중 오류가 발생했습니다.', error);
      },
    },
  );
  // 좋아요 누르기 mutation
  const changeLikeMutation = useMutation(
    (productId: string) =>
      restFetcher({
        method: 'POST',
        path: `/products/like/${productId}`,
      }),
    {
      onSuccess: (_, productId) => {
        updateLike(productId);
      },
      onError: (error) => {
        console.error('좋아요 처리 중 오류가 발생했습니다.', error);
      },
    },
  );
  const handleLike = (productId: string) => {
    if (data?.myheart) {
      deleteLikeMutation.mutate(productId);
    } else {
      changeLikeMutation.mutate(productId);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <S.Container>
      <TopNavBar page="" />
      <S.Maincontainer>
        <Carousel images={data?.productImages} />
        <S.Details>
          <S.TypeWrapper>
            <S.NameAndDateWrapper
              onClick={() =>
                navigate('/seller', { state: { userId: data?.userId, name: data?.name } })
              }
            >
              <S.Profile src={profile} alt="Profile" />
              <S.NameWrapper>
                <S.Name>{data?.name}</S.Name>
                <S.Date>{formatDateToNow(data?.createdAt as string)}</S.Date>
              </S.NameWrapper>
            </S.NameAndDateWrapper>
            <Link to="/category">
              <S.Category>{data?.categoryName}</S.Category>
            </Link>
          </S.TypeWrapper>
          <S.ContentWrapper>
            <S.ProductTitle>{data?.title}</S.ProductTitle>

            <S.DetailWrapper>
              <S.DetailName>좋아요</S.DetailName>
              <S.DetailValue>{data?.likes}</S.DetailValue>•
              {/* <S.DetailName>채팅</S.DetailName><S.DetailValue>{data?.chatroomCount}</S.DetailValue>• */}
              <S.DetailName>조회</S.DetailName>
              <S.DetailValue>{data?.views}</S.DetailValue>
            </S.DetailWrapper>

            <S.Description>
              <S.Content>{data?.content}</S.Content>
              <S.MapWrapper>
                <S.MapTitle>
                  <div>거래 희망 장소</div>
                  <div>{`${data?.location} >`}</div>
                </S.MapTitle>
                <KakaoMap location={data?.location as string} />
              </S.MapWrapper>
            </S.Description>
          </S.ContentWrapper>
        </S.Details>
        <S.Buttons>
          <S.ButtonsBox>
            <S.WishlistButton
              style={{ backgroundImage: `url(${data?.myheart ? FilledHeart : Heart})` }}
              onClick={() => handleLike(productId as string)}
            />
            <S.Price> {`${data?.price?.toLocaleString()}원`} </S.Price>
          </S.ButtonsBox>
          <S.ChatButton onClick={() => navigate('/chat')}>채팅하기</S.ChatButton>
        </S.Buttons>
      </S.Maincontainer>
      <NavBar />
    </S.Container>
  );
};
export default ItemDetail;
