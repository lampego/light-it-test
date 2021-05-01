import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { GameEntity } from '../entities/Game.entity';

export class CreateTableGames1619853835338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: GameEntity.TableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'publisher_id',
            type: 'int'
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
            name: 'phone',
            type: 'varchar(50)',
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
    await queryRunner.dropTable(GameEntity.TableName);
  }
}