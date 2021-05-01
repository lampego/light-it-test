import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { PublisherEntity } from '../entities/Publisher.entity';

export class CreateTablePublishers1619853828653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: PublisherEntity.TableName,
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
    await queryRunner.dropTable(PublisherEntity.TableName);
  }
}
