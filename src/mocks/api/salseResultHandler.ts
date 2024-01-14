import { rest } from 'msw';
import { salesResultData } from './data/salesResultData';

const salseResultHandler = [
  // 판매 내역 조회
  rest.get(`http://localhost:3000/api/mypage/sell/:userId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(salesResultData));
  }),
  // 상품 상태 수정
  rest.put(`http://localhost:3000/api/products/state/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200));
  }),
  // 상품 삭제
  rest.delete(`http://localhost:3000/api/products/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200));
  }),
];

export default salseResultHandler;
