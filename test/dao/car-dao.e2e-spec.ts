import { HttpStatus, INestApplication } from '@nestjs/common';
import TestHelper from '../TestHelper';
import { CarsDao } from '../../src/db/dao/cars-dao.service';
import { CarEntity } from '../../src/db/entities/car-entity';
import { ManufacturersDao } from '../../src/db/dao/manufacturers-dao.service';
import { ManufacturerEntity } from '../../src/db/entities/manufacturer-entity';
import { CarTagsDao } from '../../src/db/dao/car-tags-dao.service';
import * as moment from 'moment';

describe('CarDao (e2e)', () => {
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

  it('Should reset price before calculation', async () => {
    const expectedPrice = 888.0;
    const actualCalculatedPrice = 999.0;

    let fakeCar = CarEntity.createFake();
    fakeCar.manufacturer = defaultManufacturer;
    fakeCar.price = expectedPrice;
    fakeCar.calculatedPrice = actualCalculatedPrice;
    await carsDao.insert(fakeCar);

    let fakeCar2 = CarEntity.createFake();
    fakeCar2.manufacturer = defaultManufacturer;
    fakeCar2.price = expectedPrice;
    fakeCar2.calculatedPrice = actualCalculatedPrice;
    await carsDao.insert(fakeCar2);

    await carsDao.recalculateDiscount();

    fakeCar = await carsDao.findOne(fakeCar.id);
    expect(fakeCar.calculatedPrice).toBe(`888.00`);

    fakeCar2 = await carsDao.findOne(fakeCar2.id);
    expect(fakeCar2.calculatedPrice).toBe(`888.00`);
  });

  it('Should recalculate price', async () => {
    let fakeCar = CarEntity.createFake();
    fakeCar.manufacturer = defaultManufacturer;
    fakeCar.price = 100;
    fakeCar.releaseDate = moment().subtract(16, 'months').toDate();
    await carsDao.insert(fakeCar);

    await carsDao.recalculateDiscount();

    fakeCar = await carsDao.findOne(fakeCar.id);
    expect(fakeCar.calculatedPrice).toBe(`80.00`);
  });
});
