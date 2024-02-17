export type SearchData = {
  userId?: number;
  productId: number;
  title: string;
  thumbnailURL: string;
  name: string;
  price: number;
  createdAt: string;
  // productState: 'SALE' | 'RESERVED' | 'SOLD'; // 판매중, 예약중, 판매완료
  likes: number; // 좋아요 개수
  views: number;
  // userHasLiked: boolean; // 사용자가 좋아요 누른지 여부
  // chatroomCount: number; // 채팅방 개수
};

export type SearchResponse = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: null | string;
  prevPage: null | string;
  data: SearchData[];
};
