import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CarEntity } from './CarEntity';

@Entity({ name: ManufacturerEntity.TableName })
export class ManufacturerEntity {
  public static readonly TableName = 'manufacturers';

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  siret: number;

  @Column()
  phone: string;

  @OneToMany(() => CarEntity, (game) => game.manufacturer)
  cars: CarEntity;
}
