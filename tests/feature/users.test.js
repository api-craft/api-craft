const request = require('supertest');
const app = require('../../src/app'); // adjust path accordingly

describe('User Feature', () => {
  it('registers user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: '123456',
    });

    expect(res.statusCode).toBe(201);
  });
});
