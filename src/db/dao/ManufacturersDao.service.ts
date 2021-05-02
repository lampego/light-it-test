import { Injectable } from '@nestjs/common';
import { ManufacturerEntity } from '../entities/ManufacturerEntity';
import { ManufacturersRepository } from '../repository/ManufacturersRepository.service';

@Injectable()
export class ManufacturersDao {
  constructor(private repository: ManufacturersRepository) {}

  async save(entity: ManufacturerEntity): Promise<ManufacturerEntity> {
    return await this.repository.save<ManufacturerEntity>(entity);
  }

  findAll(): Promise<ManufacturerEntity[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<ManufacturerEntity> {
    return this.repository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
