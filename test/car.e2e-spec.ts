import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import TestHelper from './TestHelper';
import { CreateCarDto } from '../src/controllers/dto/request/create-car.dto';
import { CarEntity } from '../src/db/entities/car-entity';

describe('CarController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await TestHelper.createAppInstance();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('/car (GET). Should not receive list if page is incorrect', () => {
    const postData = {
      page: null,
    };
    return request(app.getHttpServer())
      .get('/car')
      .set('Content-type', 'application/json')
      .send(postData)
      .expect(422);
  });

  it('/car (POST). Should be error if manufacturer is incorrect', () => {
    const car = CarEntity.createFake();
    const postData = new CreateCarDto();
    postData.title = car.title;
    postData.tags = car.tags.map((tag) => tag.title);
    postData.price = car.price;
    postData.releaseDate = car.releaseDate;
    postData.manufacturerId = 999;

    return request(app.getHttpServer())
      .post('/car')
      .set('Content-type', 'application/json')
      .send(postData)
      .expect(422);
  });
});
