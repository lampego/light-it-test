import { Controller, Get } from '@nestjs/common';
import { ManufacturersDao } from '../db/dao/ManufacturersDao.service';

@Controller()
export class AppController {
  constructor() {
  }

  @Get('/ping')
  getPing(): string {
    return 'Pong';
  }
}
