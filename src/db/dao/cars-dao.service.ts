import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { CarsRepository } from '../repository/cars-repository.service';
import { CarEntity } from '../entities/car-entity';
import { InsertResult } from 'typeorm';

@Injectable()
export class CarsDao {
  constructor(private repository: CarsRepository) {}

  async save(entity: CarEntity): Promise<CarEntity> {
    return await this.repository.save<CarEntity>(entity);
  }

  async saveMany(entities: CarEntity[]): Promise<CarEntity[]> {
    return await this.repository.save<CarEntity>(entities);
  }

  async insert(entity: CarEntity): Promise<InsertResult> {
    return await this.repository.insert(entity);
  }

  findAll(): Promise<CarEntity[]> {
    return this.repository.find();
  }

  async findAllQuery(): Promise<SelectQueryBuilder<CarEntity>> {
    return this.repository
      .createQueryBuilder('cars')
      .leftJoinAndSelect('cars.manufacturer', 'manufacturer');
  }

  findOne(id: string): Promise<CarEntity> {
    return this.repository.findOne(id, { relations: ['manufacturer', 'tags'] });
  }

  async remove(id: string | number): Promise<void> {
    await this.repository.delete(id);
  }

  async exists(id: string | number): Promise<boolean> {
    const count = await this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getCount();
    return count > 0;
  }
}
