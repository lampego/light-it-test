import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as _ from 'lodash';
import TestHelper from './TestHelper';
import UrlUtils from '../src/utils/url-utils';
import { PaginatedResponseDto } from '../src/controllers/dto/response/paginated-response.dto';
import { CarResponseDto } from '../src/controllers/dto/response/car/car-response.dto';
import { CarsDao } from '../src/db/dao/cars-dao.service';
import { CarEntity } from '../src/db/entities/car-entity';
import { ManufacturersDao } from '../src/db/dao/manufacturers-dao.service';
import { CreateCarDto } from '../src/controllers/dto/request/car/create-car.dto';
import { ManufacturerEntity } from '../src/db/entities/manufacturer-entity';
import { CarTagsDao } from '../src/db/dao/car-tags-dao.service';

describe('CarController (e2e)', () => {
  let app: INestApplication;
  let carsDao: CarsDao;
  let carTagsDao: CarTagsDao;
  let manufacturersDao: ManufacturersDao;

  let defaultManufacturer: ManufacturerEntity;

  beforeAll(async () => {
    app = await TestHelper.createAppInstance();
    carsDao = app.get(CarsDao);
    manufacturersDao = app.get(ManufacturersDao);
    carTagsDao = app.get(CarTagsDao);
    await app.init();

    defaultManufacturer = await manufacturersDao.findOne(1);
  });

  afterAll(() => {
    app.close();
  });

  it('/car (GET). Should not receive list if page is incorrect', () => {
    const data = {
      page: null,
    };
    return request(app.getHttpServer())
      .get('/car?' + UrlUtils.encodeToQueryString(data))
      .set('Content-type', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/car (GET). Should receive empty list if page has large value', async () => {
    const data = {
      page: 999,
    };

    const fakeCar = CarEntity.createFake();
    fakeCar.manufacturer = defaultManufacturer;
    await carsDao.insert(fakeCar);

    return request(app.getHttpServer())
      .get('/car?' + UrlUtils.encodeToQueryString(data))
      .set('Content-type', 'application/json')
      .expect(HttpStatus.OK)
      .expect((response) => {
        const responseData = response.body as PaginatedResponseDto<CarResponseDto>;

        // TODO: Change it to: .toBe after seeder will be created
        expect(responseData.totalItems).toBeGreaterThanOrEqual(1);
        expect(responseData.totalPages).toBeGreaterThanOrEqual(1);
        expect(responseData.items.length).toBe(0);
      });
  });

  it('/car (GET). Should receive cars list', async () => {
    const data = {
      page: 1,
    };

    const fakeCars: CarEntity[] = [];
    for (let i = 0; i < 4; i++) {
      const fakeCar = CarEntity.createFake();
      fakeCar.manufacturer = defaultManufacturer;
      fakeCars.push(fakeCar);
    }
    await carsDao.saveMany(fakeCars);

    return request(app.getHttpServer())
      .get('/car?' + UrlUtils.encodeToQueryString(data))
      .set('Content-type', 'application/json')
      .expect(HttpStatus.OK)
      .expect((response) => {
        const responseData = response.body as PaginatedResponseDto<CarResponseDto>;

        // TODO: Change it to: .toBe after seeder will be created
        expect(responseData.totalItems).toBeGreaterThanOrEqual(3);
        expect(responseData.totalPages).toBeGreaterThanOrEqual(1);
        expect(responseData.items.length).toBeGreaterThanOrEqual(3);

        for (const index in responseData.items) {
          const item = responseData.items[index];
          expect(item.manufacturer.id).toBeGreaterThanOrEqual(1);
          expect(item.manufacturer.name).toBeTruthy();
        }
      });
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
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/car (POST). Should add new car', () => {
    const car = CarEntity.createFake();
    const postData = new CreateCarDto();
    postData.title = car.title;
    postData.tags = car.tags.map((tag) => tag.title);
    postData.price = car.price;
    postData.releaseDate = car.releaseDate;
    postData.manufacturerId = postData.manufacturerId = defaultManufacturer.id;

    return request(app.getHttpServer())
      .post('/car')
      .set('Content-type', 'application/json')
      .send(postData)
      .expect(HttpStatus.CREATED)
      .expect((response) => {
        const responseData = response.body as CarResponseDto;

        expect(responseData).toBeTruthy();
        expect(responseData.title).toBeTruthy();
        expect(responseData.id).toBeGreaterThanOrEqual(1);

        expect(responseData.manufacturer.id).toBeGreaterThanOrEqual(1);
        expect(responseData.manufacturer.name).toBeTruthy();

        expect(responseData.tags.length).toBe(4);
      });
  });

  it('/car/:id (GET). Should not receive exists car', async () => {
    return request(app.getHttpServer())
      .get(`/car/987897`)
      .set('Content-type', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/car/:id (GET). Should receive exists car', async () => {
    let fakeCar = CarEntity.createFake();
    fakeCar.manufacturer = defaultManufacturer;
    fakeCar = await carsDao.save(fakeCar);
    for (const i in fakeCar.tags) {
      const tag = fakeCar.tags[i];
      await carTagsDao.set(fakeCar, tag.title);
    }

    return request(app.getHttpServer())
      .get(`/car/${fakeCar.id}`)
      .set('Content-type', 'application/json')
      .expect(HttpStatus.OK)
      .expect((response) => {
        const responseData = response.body as CarResponseDto;

        expect(responseData).toBeTruthy();
        expect(responseData.title).toBeTruthy();
        expect(responseData.id).toBeGreaterThanOrEqual(1);

        expect(responseData.manufacturer.id).toBeGreaterThanOrEqual(1);
        expect(responseData.manufacturer.name).toBeTruthy();

        // It's not good but randomizer sometimes creates not unique tags
        expect(responseData.tags.length).toBeGreaterThan(3);
      });
  });

  it('/car/:id (PUT). Should not update exists car', async () => {
    return request(app.getHttpServer())
      .get(`/car/987897`)
      .set('Content-type', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/car/:id (PUT). Should update exists car', async () => {
    let fakeCar = CarEntity.createFake();
    fakeCar.manufacturer = defaultManufacturer;
    fakeCar = await carsDao.save(fakeCar);
    for (const i in fakeCar.tags) {
      const tag = fakeCar.tags[i];
      await carTagsDao.set(fakeCar, tag.title);
    }

    const newCarData = CarEntity.createFake();
    const postData = new CreateCarDto();
    postData.title = newCarData.title;
    postData.tags = newCarData.tags.map((tag) => tag.title);
    postData.price = newCarData.price;
    postData.releaseDate = newCarData.releaseDate;
    postData.manufacturerId = defaultManufacturer.id;

    return request(app.getHttpServer())
      .put(`/car/${fakeCar.id}`)
      .set('Content-type', 'application/json')
      .send(postData)
      .expect(HttpStatus.OK)
      .expect((response) => {
        const responseData = response.body as CarResponseDto;

        expect(responseData).toBeTruthy();
        expect(responseData.title).toBe(newCarData.title);
        expect(responseData.id).toBe(fakeCar.id);

        expect(responseData.manufacturer.id).toBeGreaterThanOrEqual(1);
        expect(responseData.manufacturer.name).toBeTruthy();

        expect(responseData.tags.length).toBe(4);
      });
  });

  it('/car/:id (DELETE). Should not delete car', async () => {
    return request(app.getHttpServer())
      .delete(`/car/987987987`)
      .set('Content-type', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/car/:id (DELETE). Should delete exists car', async () => {
    let fakeCar = CarEntity.createFake();
    fakeCar.manufacturer = defaultManufacturer;
    fakeCar = await carsDao.save(fakeCar);
    for (const i in fakeCar.tags) {
      const tag = fakeCar.tags[i];
      await carTagsDao.set(fakeCar, tag.title);
    }

    return request(app.getHttpServer())
      .delete(`/car/${fakeCar.id}`)
      .set('Content-type', 'application/json')
      .expect(HttpStatus.OK)
      .expect(async (response) => {
        const isExists = await carsDao.exists(fakeCar.id);
        expect(isExists).toBeFalsy();
      });
  });
});
