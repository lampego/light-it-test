import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import TestHelper from './TestHelper';
import UrlUtils from '../src/utils/url-utils';
import { PaginatedResponseDto } from '../src/controllers/dto/response/paginated-response.dto';
import { CarListItemDto } from '../src/controllers/dto/response/car/car-list-item.dto';

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
    const data = {
      page: null,
    };
    return request(app.getHttpServer())
      .get('/car?' + UrlUtils.encodeToQueryString(data))
      .set('Content-type', 'application/json')
      .expect(400);
  });

  it('/car (GET). Should receive empty list if page has large value', () => {
    const data = {
      page: 999,
    };

    return request(app.getHttpServer())
      .get('/car?' + UrlUtils.encodeToQueryString(data))
      .set('Content-type', 'application/json')
      .expect(200)
      .expect((response) => {
        const responseData = response.body as PaginatedResponseDto<CarListItemDto>;

        // TODO: Change it to: .toBe after seeder will be created
        expect(responseData.totalItems).toBeGreaterThanOrEqual(1);
        expect(responseData.totalPages).toBeGreaterThanOrEqual(1);
        expect(responseData.items.length).toBe(0);
      });
  });

  it('/car (GET). Should receive cars list', () => {
    const data = {
      page: 1,
    };

    return request(app.getHttpServer())
      .get('/car?' + UrlUtils.encodeToQueryString(data))
      .set('Content-type', 'application/json')
      .expect(200)
      .expect((response) => {
        const responseData = response.body as PaginatedResponseDto<CarListItemDto>;

        // TODO: Change it to: .toBe after seeder will be created
        expect(responseData.totalItems).toBeGreaterThanOrEqual(1);
        expect(responseData.totalPages).toBeGreaterThanOrEqual(1);
        expect(responseData.items.length).toBeGreaterThanOrEqual(1);
      });
  });

  // it('/car (POST). Should be error if manufacturer is incorrect', () => {
  //   const car = CarEntity.createFake();
  //   const postData = new CreateCarDto();
  //   postData.title = car.title;
  //   postData.tags = car.tags.map((tag) => tag.title);
  //   postData.price = car.price;
  //   postData.releaseDate = car.releaseDate;
  //   postData.manufacturerId = 999;
  //
  //   return request(app.getHttpServer())
  //     .post('/car')
  //     .set('Content-type', 'application/json')
  //     .send(postData)
  //     .expect(422);
  // });
});
