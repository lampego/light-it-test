import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { CarTagEntity } from '../entities/car-tag-entity';

export class CreateTableCarTags1619854367171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: CarTagEntity.TableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar(100)',
          },
          {
            name: 'car_id',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CarTagEntity.TableName);
  }
}
