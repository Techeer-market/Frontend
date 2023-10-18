import { rest } from 'msw';
import { salesResultData } from './data/salesResultData';

const salseResultHandler = [
  rest.get('http://localhost:8080/api/mypage/sell', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(salesResultData),
    )
  })
];

export default salseResultHandler;