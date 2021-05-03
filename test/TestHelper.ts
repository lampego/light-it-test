import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from '../src/db/repository/ManufacturersRepository.service';
import { HomeController } from '../src/controllers/home.controller';
import { ManufacturersDao } from '../src/db/dao/manufacturers-dao.service';
import { CarController } from '../src/controllers/car.controller';

export default class TestHelper {
  public static async createAppInstance(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([ManufacturersRepository]),
      ],
      exports: [],
      controllers: [HomeController, CarController],
      providers: [ManufacturersDao],
    }).compile();

    return moduleFixture.createNestApplication();
  }
}
