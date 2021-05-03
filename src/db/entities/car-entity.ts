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

  @Column({ name: 'calculated_price' })
  calculatedPrice: number;

  @Column({ name: 'release_date' })
  releaseDate: Date;

  @ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer.cars)
  @JoinColumn({ name: 'manufacturer_id', referencedColumnName: 'id' })
  manufacturer: ManufacturerEntity;

  @OneToMany(() => CarTagEntity, (tag) => tag.car)
  tags: CarTagEntity[];

  public static createFake(tagsCount = 4): CarEntity {
    const entity = new CarEntity();
    entity.title = faker.vehicle.model();
    entity.price = faker.datatype.number(1000000);
    entity.calculatedPrice = entity.price;
    entity.releaseDate = faker.date.past();

    entity.tags = [];
    for (let i = 1; i <= tagsCount; i++) {
      const tag = new CarTagEntity(faker.lorem.word());
      entity.tags.push(tag);
    }
    return entity;
  }
}
