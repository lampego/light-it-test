import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CarsDao } from '../db/dao/cars-dao.service';

@Injectable()
export default class CrontabService {
  private readonly logger = new Logger(CrontabService.name);

  constructor(private carsDao: CarsDao) {}

  @Cron('0 0 0 * * *')
  async recalculateCarPricesJob() {
    this.logger.debug('Price recalculation. Wait a minute :)');
    await this.carsDao.recalculateDiscount();
  }
}
