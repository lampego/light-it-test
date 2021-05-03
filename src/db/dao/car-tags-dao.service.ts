import { Injectable } from '@nestjs/common';
import { CarEntity } from '../entities/car-entity';
import { CarTagsRepository } from '../repository/CarTagsRepository.service';
import { CarTagEntity } from '../entities/car-tag-entity';

@Injectable()
export class CarTagsDao {
  constructor(private repository: CarTagsRepository) {}

  async set(car: CarEntity, title: string): Promise<CarTagEntity> {
    let existsItem = await this.findOne(car.id, title);
    if (!existsItem) {
      existsItem = new CarTagEntity(title);
      existsItem.car = car;
      return await this.repository.save<CarTagEntity>(existsItem);
    }
    return existsItem;
  }

  async findOne(carId: number, title: string): Promise<CarTagEntity> {
    return this.repository
      .createQueryBuilder()
      .where('car_id = :carId AND title = :title', { carId, title })
      .getOne();
  }
}
