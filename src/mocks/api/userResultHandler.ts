import { rest } from 'msw';

const userResultHandler = [
  // 로그인
  rest.post('http://localhost:3000/api/users/login', (req, res, ctx) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    if (email === 'test@test.com' && password === 'test12') {
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
        // birthday: '2001-07-21',
        social: 'LOCAl',
        // profileUrl:
        //   'https://res.cloudinary.com/dusavg0vn/image/upload/v1695805125/214244769_1_1678264995_w1100_10_1_uwaqdy.png',
      }),
    );
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
