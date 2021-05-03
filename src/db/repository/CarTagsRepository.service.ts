import { EntityRepository, Repository } from 'typeorm';
import { CarTagEntity } from '../entities/car-tag-entity';

@EntityRepository(CarTagEntity)
export class CarTagsRepository extends Repository<CarTagEntity> {}
