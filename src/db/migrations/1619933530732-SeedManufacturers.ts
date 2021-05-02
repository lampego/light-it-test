import { MigrationInterface, QueryRunner } from 'typeorm';
import { ManufacturerEntity } from '../entities/ManufacturerEntity';

export class SeedManufacturers1619933530732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
      
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`TRUNCATE TABLE ${ManufacturerEntity.TableName}`);
  }
}
