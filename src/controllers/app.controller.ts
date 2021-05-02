import { Controller, Get } from '@nestjs/common';
import { ManufacturersDao } from '../db/dao/ManufacturersDao.service';

@Controller()
export class AppController {
  constructor(private readonly service: ManufacturersDao) {
  }

  @Get('/ping')
  getPing(): string {
    return 'Pong';
  }
}
