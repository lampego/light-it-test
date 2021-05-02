import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ManufacturerEntity } from './manufacturer-entity';
import { CarTagEntity } from './car-tag-entity';
import * as faker from 'faker';

@Entity({ name: CarEntity.TableName })
export class CarEntity {
  public static readonly TableName = 'cars';

  @PrimaryGeneratedColumn()
  id: number;

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
  tags: CarTagEntity[];

  public static createFake(): CarEntity {
    const entity = new CarEntity();
    entity.title = faker.vehicle.model();
    entity.price = faker.datatype.number(1000000);
    entity.releaseDate = faker.date.past();

    entity.tags = [];
    for (const i in Array(4)) {
      const tag = new CarTagEntity();
      tag.title = faker.lorem.word();
      entity.tags.push(tag);
    }
    return entity;
  }
}
