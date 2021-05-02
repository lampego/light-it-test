import { Controller, Get } from '@nestjs/common';
import { ManufacturersDao } from '../db/dao/manufacturers-dao.service';

@Controller()
export class HomeController {
  constructor() {
  }

  @Get('/ping')
  getPing(): string {
    return 'Pong';
  }
}
