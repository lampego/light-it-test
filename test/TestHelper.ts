import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from '../src/db/repository/manufacturers-repository.service';
import { HomeController } from '../src/controllers/home.controller';
import { ManufacturersDao } from '../src/db/dao/manufacturers-dao.service';
import { CarController } from '../src/controllers/car.controller';
import { CarsRepository } from '../src/db/repository/cars-repository.service';
import { CarsDao } from '../src/db/dao/cars-dao.service';
import { CarTagsRepository } from '../src/db/repository/car-tags-repository.service';
import { CarTagsDao } from '../src/db/dao/car-tags-dao.service';

export default class TestHelper {
  public static async createAppInstance(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([
          ManufacturersRepository,
          CarsRepository,
          CarTagsRepository,
        ]),
      ],
      exports: [],
      controllers: [HomeController, CarController],
      providers: [ManufacturersDao, CarsDao, CarTagsDao],
    }).compile();

    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    return app;
  }
}
