import { MigrationInterface, QueryRunner } from 'typeorm';
import { ManufacturerEntity } from '../entities/manufacturer-entity';

export class SeedManufacturers1619933530732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      insert into ${ManufacturerEntity.TableName} (id, name, siret, phone)
        values (1, 'Volkswagen', 11, '190661234569'),
            (2, 'Toyota', 12, '190661234569'),
            (3, 'Renault', 13, '190661234569'),
            (4, 'Nissan', 14, '190661234569'),
            (5, 'Hyundai', 15, '190661234569'),
            (6, 'Kia', 16, '190661234569'),
            (7, 'Ford', 17, '190661234569'),
            (8, 'Honda', 18, '190661234569'),
            (9, 'Suzuki', 19, '190661234569')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE ${ManufacturerEntity.TableName}`);
  }
}
