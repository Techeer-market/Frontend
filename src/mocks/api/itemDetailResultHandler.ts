import { rest } from 'msw';
import { itemDetailResultData } from './data/itemDetailResultData';

const itemDetailResultHandler = [
  rest.get(`http://localhost:3000/api/products/list/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    return res(ctx.status(200), ctx.json(itemDetailResultData));
  }),
];

export default itemDetailResultHandler;
