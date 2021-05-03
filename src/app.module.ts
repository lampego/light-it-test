import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from './db/repository/ManufacturersRepository.service';
import { ManufacturersDao } from './db/dao/manufacturers-dao.service';
import { CarController } from './controllers/car.controller';
import { CarsRepository } from './db/repository/CarsRepository.service';
import { CarsDao } from './db/dao/cars-dao.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      ManufacturersRepository,
      CarsRepository
    ]),
  ],
  exports: [],
  controllers: [HomeController, CarController],
  providers: [ManufacturersDao, CarsDao],
})
export class AppModule {
  constructor() {}
}
