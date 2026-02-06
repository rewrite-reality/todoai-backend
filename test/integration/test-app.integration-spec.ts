import { createTestApp, TestApplication } from '../helpers/app';

describe('Test application bootstrap', () => {
  let testApp: TestApplication;

  beforeAll(async () => {
    testApp = await createTestApp();
  });

  afterAll(async () => {
    await testApp.close();
  });

  it('boots Nest app and responds to HTTP', async () => {
    const res = await testApp.request.get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World!');
  });
});
