import { rest } from 'msw';
import { purchaseResultData } from './data/purchaseResultData';

const purchaseResultHandler = [
  rest.get(`http://localhost:3000/api/mypage/purchase`, (req, res, ctx) => {
    const idx = req.url.searchParams.get('pageNo');
    const limit = req.url.searchParams.get('pageSize');

    if (idx === '1') {
      return res(ctx.status(200), ctx.json(purchaseResultData));
    } else if (idx === '2') {
      return res(ctx.status(200), ctx.json([]));
    }
  }),
];

export default purchaseResultHandler;
