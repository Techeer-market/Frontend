import { rest } from 'msw';
import { wishResultData } from './data/wishResultData';

const wishResultHandler = [
  // 좋아요 목록
  rest.get(`http://localhost:3000/api/mypage/like`, (req, res, ctx) => {
    const idx = req.url.searchParams.get('pageNo');
    const limit = req.url.searchParams.get('pageSize');

    if (idx === '1' || idx === '2' || idx === '3') {
      return res(ctx.status(200), ctx.json(wishResultData));
    }
  }),

  // 각 상품의 채팅방 개수
  rest.get(`http://localhost:3000/api/chatroom/count/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200), ctx.json(5));
  }),
  // 좋아요 누르기
  rest.post(`http://localhost:3000/api/products/like/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200));
  }),

  // 좋아요 취소
  rest.delete(`http://localhost:3000/api/products/like/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200));
  }),
];

export default wishResultHandler;
