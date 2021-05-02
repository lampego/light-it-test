import { EntityRepository, Repository } from 'typeorm';
import { ManufacturerEntity } from '../entities/ManufacturerEntity';

@EntityRepository(ManufacturerEntity)
export class ManufacturersRepository extends Repository<ManufacturerEntity> {}