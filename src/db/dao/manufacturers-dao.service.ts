import { Injectable } from '@nestjs/common';
import { ManufacturerEntity } from '../entities/manufacturer-entity';
import { ManufacturersRepository } from '../repository/ManufacturersRepository.service';
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

@Injectable()
export class ManufacturersDao {
  constructor(private repository: ManufacturersRepository) {}

  async save(entity: ManufacturerEntity): Promise<ManufacturerEntity> {
    return await this.repository.save<ManufacturerEntity>(entity);
  }

  findAll(): Promise<ManufacturerEntity[]> {
    return this.repository.find();
  }

  async findAllQuery(): Promise<SelectQueryBuilder<ManufacturerEntity>> {
    return this.repository.createQueryBuilder();
  }

  findOne(id: string): Promise<ManufacturerEntity> {
    return this.repository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.repository
      .createQueryBuilder()
      .where('id = :id', { id: 1 })
      .getCount();
    return Promise.resolve(count > 0);
  }
}
