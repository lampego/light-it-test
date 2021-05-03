import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import TestHelper from './TestHelper';

describe('HomeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await TestHelper.createAppInstance();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/ping (GET)', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect('Pong');
  });
});
