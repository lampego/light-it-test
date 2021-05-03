import { EntityRepository, Repository } from 'typeorm';
import { ManufacturerEntity } from '../entities/manufacturer-entity';

@EntityRepository(ManufacturerEntity)
export class ManufacturersRepository extends Repository<ManufacturerEntity> {}