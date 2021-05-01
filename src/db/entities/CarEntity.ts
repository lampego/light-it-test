import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { ManufacturerEntity } from './ManufacturerEntity';
import { CarTagEntity } from './CarTagEntity';

@Entity({ name: CarEntity.TableName })
export class CarEntity {
  public static readonly TableName = 'cars';

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ name: 'release_date' })
  releaseDate: Date;

  @ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.cars)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: ManufacturerEntity;

  @OneToMany(() => CarEntity, (tag) => tag.tags)
  tags: CarTagEntity;
}
