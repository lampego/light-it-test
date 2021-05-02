import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Connection } from 'typeorm';
import { ManufacturerEntity } from '../src/db/entities/ManufacturerEntity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from '../src/db/repository/ManufacturersRepository.service';
import { HomeController } from '../src/controllers/homeController';
import { ManufacturersDao } from '../src/db/dao/ManufacturersDao.service';
import TestHelper from "./TestHelper";

describe('AppController (e2e)', () => {
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
