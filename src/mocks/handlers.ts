import { rest } from 'msw';
import { CategoryData, CategoryNumData } from '@/types/category';
import { mainCategory } from '@/constants/mainCategory';

const dummy = '테스트데이터';
const category: CategoryData[] = [
  {
    id: 1,
    title: '디지털기기',
    image: 'category1',
  },
  {
    id: 2,
    title: '여성의류',
    image: 'category2',
  },
  {
    id: 3,
    title: '남성의류/잡화',
    image: 'category3',
  },
  {
    id: 4,
    title: '뷰티/미용',
    image: 'category4',
  },
  {
    id: 5,
    title: '여성잡화',
    image: 'category5',
  },
  {
    id: 6,
    title: '생활가전',
    image: 'category6',
  },
  {
    id: 7,
    title: '생활/주방',
    image: 'category7',
  },
  {
    id: 8,
    title: '취미/게임/음반',
    image: 'category8',
  },
  {
    id: 9,
    title: '도서',
    image: 'category9',
  },
];

export const handlers = [
  rest.get(`/category/:id=${category.id}`, async (req, res, ctx) => {
    const categoryId = parseInt(req.params.category.id);
    const filterCategory = category.find((categoryId) => categoryId.id === mainCategory);
    if (filterCategory) {
      return res(ctx.status(200), ctx.json(filterCategory));
    } else {
      return res(ctx.status(404), ctx.json({ message: '카테고리 못찾겠어여' }));
    }
  }),
];

// mock/api로 분리
// import wishResultHandler from './api/wishResultHandler';
// import salseResultHandler from './api/salseResultHandler';
// import purchaseResultHandler from './api/purchaseResultHandler';

// export const handlers = [...wishResultHandler, ...salseResultHandler, ...purchaseResultHandler];