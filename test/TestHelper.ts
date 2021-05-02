import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from '../src/db/repository/ManufacturersRepository.service';
import { HomeController } from '../src/controllers/homeController';
import { ManufacturersDao } from '../src/db/dao/ManufacturersDao.service';

export default class TestHelper {
  public static async createAppInstance(): Promise<INestApplication> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([ManufacturersRepository]),
      ],
      exports: [],
      controllers: [HomeController],
      providers: [ManufacturersDao],
    }).compile();

    return moduleFixture.createNestApplication();
  }
}
