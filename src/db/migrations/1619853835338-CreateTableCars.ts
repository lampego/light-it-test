import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { CarEntity } from '../entities/car-entity';

export class CreateTableCars1619853835338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: CarEntity.TableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'manufacturer_id',
            type: 'int',
          },
          {
            name: 'title',
            type: 'varchar(100)',
          },
          {
            name: 'price',
            type: 'decimal(8,2)',
          },
          {
            name: 'release_date',
            type: 'datetime',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CarEntity.TableName);
  }
}
