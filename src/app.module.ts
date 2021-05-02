import { Module } from '@nestjs/common';
import { HomeController } from './controllers/homeController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from './db/repository/ManufacturersRepository.service';
import { ManufacturersDao } from './db/dao/ManufacturersDao.service';
import { CarController } from './controllers/car.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([ManufacturersRepository]),
  ],
  exports: [],
  controllers: [HomeController, CarController],
  providers: [ManufacturersDao],
})
export class AppModule {
  constructor() {}
}
