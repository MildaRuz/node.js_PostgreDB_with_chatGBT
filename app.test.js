const request = require('supertest');
const app = require('./app');

jest.mock('./db_config');

describe('API status code tests', () => {
  test('GET /transactions returns status 200', async () => {
    const response = await request(app).get('/transactions');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          amount: expect.any(String),
          userto: expect.any(Number),
          userfrom: expect.any(Number),
        },
      ])
    );
  });

  test('POST /transactions returns status 200', async () => {
    const response = await request(app).post('/transactions').send({ amount: 100, userto: 2, userfrom: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      amount: '100',
      userto: 2,
      userfrom: 1,
    });
  });
});
