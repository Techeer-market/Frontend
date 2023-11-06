export type Product = {
  productUuid: string;
  title: string;
  name: string;
  date: string;
  price: number;
  image_url_1: string;
  productState: 'SALE' | 'RESERVED' | 'SOLD'; // 판매중, 예약중, 판매완료
  tradeType: 'CoolDeal' | 'GeneralDeal';
  likeCount: number; // 좋아요 개수
  userHasLiked: boolean; // 사용자가 좋아요 누른지 여부
  chatroomCount: number; // 채팅방 개수
};
