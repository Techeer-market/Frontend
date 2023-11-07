import { rest } from 'msw';
import { purchaseResultData } from './data/purchaseResultData';

const purchaseResultHandler = [
  rest.get(`http://localhost:3000/api/mypage/purchase`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(purchaseResultData));
  }),
];

export default purchaseResultHandler;
