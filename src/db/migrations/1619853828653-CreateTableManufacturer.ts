import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ManufacturerEntity } from '../entities/manufacturer-entity';

export class CreateTableManufacturer1619853828653
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ManufacturerEntity.TableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(100)',
          },
          {
            name: 'siret',
            type: 'integer',
          },
          {
            name: 'phone',
            type: 'varchar(50)',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ManufacturerEntity.TableName);
  }
}
