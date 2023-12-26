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
