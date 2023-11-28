import { rest } from 'msw';
import { salesResultData } from './data/salesResultData';

const mainResultHandler = [
  rest.get(`http://localhost:3000/api/products/list`, (req, res, ctx) => {
    const idx = req.url.searchParams.get('pageNo');
    const limit = req.url.searchParams.get('pageSize');

    if (idx === '1') {
      return res(ctx.status(200), ctx.json(salesResultData));
    }
  }),
];

export default mainResultHandler;
