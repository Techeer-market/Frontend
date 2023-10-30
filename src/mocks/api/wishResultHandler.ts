import { rest } from 'msw';
import { wishResultData1, wishResultData2, wishResultData3 } from './data/wishResultData';
import { BASE_URL } from '@/constants/baseURL';

const wishResultHandler = [
  // 좋아요 목록
  rest.get(`${BASE_URL}/mypage/like`, (req, res, ctx) => {
    const idx = req.url.searchParams.get('pageNo');
    const limit = req.url.searchParams.get('pageSize');

    let responseData;
    if (idx === '1') {
      responseData = wishResultData1;
    } else if (idx === '2') {
      responseData = wishResultData2;
    } else if (idx === '3') {
      responseData = wishResultData3;
    } else {
      responseData = {}; // 기본값 또는 에러 데이터
    }

    return res(ctx.status(200), ctx.json(responseData));
  }),

  // 각 상품의 채팅방 개수
  rest.get(`${BASE_URL}/chatroom/count/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200), ctx.json(5));
  }),
  // 좋아요 누르기
  rest.post(`${BASE_URL}/products/like/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200));
  }),

  // 좋아요 취소
  rest.delete(`${BASE_URL}/products/like/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200));
  }),
];

export default wishResultHandler;
