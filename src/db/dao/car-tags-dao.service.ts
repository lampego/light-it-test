import { Injectable } from '@nestjs/common';
import { CarEntity } from '../entities/car-entity';
import { CarTagsRepository } from '../repository/car-tags-repository.service';
import { CarTagEntity } from '../entities/car-tag-entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

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
    return await this.repository
      .createQueryBuilder()
      .where('car_id = :carId AND title = :title', { carId, title })
      .getOne();
  }

  async deleteForCar(carId: number): Promise<DeleteResult> {
    return await this.repository
      .createQueryBuilder()
      .delete()
      .where('car_id = :carId', { carId })
      .execute();
  }
}
