import { rest, RestHandler, MockedRequest, DefaultBodyType } from 'msw';
import { categoryListData } from './data/categoryListData';
import { mainCategory } from '@/constants/mainCategory';
import { CategoryData } from '@/types/category';

const categoryListHandler = (mainCategory: CategoryData) => [
  rest.get(`http://localhost:3000/api/category/${mainCategory.id}`, (req, res, ctx) => {
    const idx = req.url.searchParams.get('pageNo');
    const limit = req.url.searchParams.get('pageSize');

    if (idx === '1') {
      return res(ctx.status(200), ctx.json(categoryListData));
    } else if (idx === '2') {
      return res(ctx.status(200), ctx.json([]));
    }
  }),
];

export default categoryListHandler;
