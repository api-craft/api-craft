import request from 'supertest';
import app from "../../app.js";

describe('User Feature', () => {
  it('registers user', async () => {
    const res = await request(app).post('/api/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: '123456',
      role:"user"
    });

    expect(res.statusCode).toBe(201);
  });
});
