import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturersRepository } from './db/repository/ManufacturersRepository.service';
import { Connection } from 'typeorm';
import { ManufacturersDao } from './db/dao/ManufacturersDao.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([ManufacturersRepository]),
  ],
  exports: [
  ],
  controllers: [AppController],
  providers: [
    ManufacturersDao
  ],
})
export class AppModule {
  constructor(connection: Connection) {}
}
