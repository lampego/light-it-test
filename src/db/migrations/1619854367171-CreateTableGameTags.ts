import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { GameTagEntity } from '../entities/GameTag.entity';

export class CreateTableGameTags1619854367171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: GameTagEntity.TableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'tag_id',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(GameTagEntity.TableName);
  }
}
