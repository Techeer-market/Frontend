import { rest } from 'msw';
import { purchaseResultData } from './data/purchaseResultData';
import { BASE_URL } from '@/constants/baseURL';

const purchaseResultHandler = [
    rest.get(`${BASE_URL}/mypage/purchase`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(purchaseResultData),
        )
    })
];

export default purchaseResultHandler;