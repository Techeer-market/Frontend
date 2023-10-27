import { rest } from 'msw';
import { salesResultData } from './data/salesResultData';
import { BASE_URL } from '@/constants/baseURL';

const salseResultHandler = [
  // 판매 내역 조회
  rest.get(`${BASE_URL}/mypage/sell`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(salesResultData),
    )
  }),
  // 상품 상태 수정
  rest.put(`${BASE_URL}/products/:productId/:state`, (req, res, ctx) => {
    const productId = req.params.productId;
    const state = req.params.state;
    return res(ctx.status(200));
  }),
  // 상품 삭제
  rest.delete(`${BASE_URL}/products/:productId`, (req, res, ctx) => {
    const productId = req.params.productId;
    return res(ctx.status(200));
  }),
];

export default salseResultHandler;