import { ManufacturerEntity } from '../entities/ManufacturerEntity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ManufacturerEntity)
export class ManufacturersRepository extends Repository<ManufacturerEntity> {}