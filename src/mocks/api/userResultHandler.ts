import { rest } from 'msw';

const userResultHandler = [
  // 로그인
  rest.post('http://localhost:3000/api/users/login', (req, res, ctx) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (email === 'test@test.com' && password === 'test1234') {
      return res(
        ctx.status(200),
        ctx.set('Access-Token', '1111'),
        ctx.set('Refresh-Token', '2222'),
        ctx.json({ success: true }),
      );
    } else {
      return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
    }
  }),

  // 유저 정보 조회
  rest.get('http://localhost:3000/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        email: 'test@test.com',
        name: 'test',
        social: 'LOCAl',
        profileUrl: null,
      }),
    );
  }),

  rest.get('http://localhost:3000/api/users/authorize', (req, res, ctx) => {
    return res(ctx.status(200), ctx.set('access-token', '3333'));
  }),

  // 유저 정보 수정
  rest.patch('http://localhost:3000/api/users/update', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(req.body));
  }),

  // 로그아웃
  rest.post('http://localhost:3000/api/users/logout', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),

  // 회원 탈퇴하기
  rest.delete('http://localhost:3000/api/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];

export default userResultHandler;
