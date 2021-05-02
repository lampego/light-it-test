import { Controller, Get } from '@nestjs/common';
import { ManufacturersDao } from '../db/dao/ManufacturersDao.service';

@Controller()
export class AppController {
  constructor(private readonly service: ManufacturersDao) {
    // console.log(service.findAll());
  }

  @Get('/ping')
  getPing(): string {
    return 'Pong';
  }
}
