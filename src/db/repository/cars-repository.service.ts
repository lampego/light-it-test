import { EntityRepository, Repository } from 'typeorm';
import { CarEntity } from '../entities/car-entity';

@EntityRepository(CarEntity)
export class CarsRepository extends Repository<CarEntity> {}
