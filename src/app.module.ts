import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from './db/repository/manufacturers-repository.service';
import { ManufacturersDao } from './db/dao/manufacturers-dao.service';
import { CarController } from './controllers/car.controller';
import { CarsRepository } from './db/repository/cars-repository.service';
import { CarsDao } from './db/dao/cars-dao.service';
import { CarTagsRepository } from './db/repository/car-tags-repository.service';
import { CarTagsDao } from './db/dao/car-tags-dao.service';
import { ScheduleModule } from '@nestjs/schedule';
import CrontabService from './services/crontab.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      ManufacturersRepository,
      CarsRepository,
      CarTagsRepository,
    ]),
    ScheduleModule.forRoot(),
  ],
  exports: [],
  controllers: [HomeController, CarController],
  providers: [CrontabService, ManufacturersDao, CarsDao, CarTagsDao],
})
export class AppModule {}
