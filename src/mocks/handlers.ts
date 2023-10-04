import { rest } from 'msw';
import { CategoryData } from '@/types/category';

const dummy = '테스트데이터';
const category: CategoryData[] = [
  {
    id: 'category1',
    title: '디지털기기',
    image: 'category1',
  },
  {
    id: 'category2',
    title: '여성의류',
    image: 'category2',
  },
  {
    id: 'category3',
    title: '남성의류/잡화',
    image: 'category3',
  },
  {
    id: 'category4',
    title: '뷰티/미용',
    image: 'category4',
  },
  {
    id: 'category5',
    title: '여성잡화',
    image: 'category5',
  },
  {
    id: 'category6',
    title: '생활가전',
    image: 'category6',
  },
  {
    id: 'category7',
    title: '생활/주방',
    image: 'category7',
  },
  {
    id: 'category8',
    title: '취미/게임/음반',
    image: 'category8',
  },
  {
    id: 'category9',
    title: '도서',
    image: 'category9',
  },
];

export const handlers = [
  rest.get('/api/test', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummy));
  }),
  rest.get('/api/category', (req, res, ctx) => {
    const categoryParam = req.url.searchParams.get('category1');
    if (categoryParam) {
      const found = category.find((category) => category.id === categoryParam);
      if (found) {
        return res(ctx.status(200), ctx.json(found));
      } else {
        return res(ctx.status(404), ctx.json({ message: '잘못된 경로입니다.' }));
      }
    }
  }),
];

// mock/api로 분리
// import salseResultHandler from './api/salseResultHandler';
// import purchaseResultHandler from './api/purchaseResultHandler';

// export const handlers = [...salseResultHandler, ...purchaseResultHandler];