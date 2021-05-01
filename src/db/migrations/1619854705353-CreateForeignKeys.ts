import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
} from 'typeorm';
import { GameEntity } from '../entities/Game.entity';
import { PublisherEntity } from '../entities/Publisher.entity';

export class CreateForeignKeys1619854705353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      GameEntity.TableName,
      new TableForeignKey({
        columnNames: ['publisher_id'],
        referencedColumnNames: ['id'],
        referencedTableName: PublisherEntity.TableName,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Down will not not working for this :)
  }
}
