// export const handlers = [
//   rest.get(`/category/:id=${category.id}`, async (req, res, ctx) => {
//     const categoryId = parseInt(req.params.category.id);
//     const filterCategory = category.find((categoryId) => categoryId.id === mainCategory);
//     if (filterCategory) {
//       return res(ctx.status(200), ctx.json(filterCategory));
//     } else {
//       return res(ctx.status(404), ctx.json({ message: '카테고리 못찾겠어여' }));
//     }
//   }),
// ];

// mock/api로 분리
import mainResultHandler from './api/mainResultHandler';
import wishResultHandler from './api/wishResultHandler';
import salseResultHandler from './api/salseResultHandler';
import purchaseResultHandler from './api/purchaseResultHandler';
import userResultHandler from './api/userResultHandler';
import itemDetailResultHandler from './api/itemDetailResultHandler';

export const handlers = [
  ...mainResultHandler,
  ...wishResultHandler,
  ...salseResultHandler,
  ...purchaseResultHandler,
  ...userResultHandler,
  ...itemDetailResultHandler,
];
