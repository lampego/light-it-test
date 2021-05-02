import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManufacturerEntity } from '../entities/ManufacturerEntity';

@Injectable()
export class ManufacturersRepository {
  @InjectRepository(ManufacturerEntity)
  private repository: Repository<ManufacturerEntity>;

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
