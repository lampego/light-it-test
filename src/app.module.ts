import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from './db/repository/ManufacturersRepository.service';
import { ManufacturersDao } from './db/dao/manufacturers-dao.service';
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
