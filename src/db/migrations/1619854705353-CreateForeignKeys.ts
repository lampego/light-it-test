import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { CarEntity } from '../entities/CarEntity';
import { ManufacturerEntity } from '../entities/ManufacturerEntity';
import { CarTagEntity } from '../entities/CarTagEntity';

export class CreateForeignKeys1619854705353 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      CarEntity.TableName,
      new TableForeignKey({
        columnNames: ['manufacturer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: ManufacturerEntity.TableName,
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      CarTagEntity.TableName,
      new TableForeignKey({
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: CarEntity.TableName,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Down will not not working for this :)
  }
}
