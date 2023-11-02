import { rest } from 'msw';

const loginResultHandler = [
  rest.post('http://localhost:3000/api/users/login', (req, res, ctx) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (email === 'test@test.com' && password === 'test12') {
      return res(
        ctx.status(200),
        ctx.set('Access-Token', 'mocked_access_token'),
        ctx.set('Refresh-Token', 'mocked_refresh_token'),
        ctx.json({ success: true }),
      );
    } else {
      return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
    }
  }),
];

export default loginResultHandler;
