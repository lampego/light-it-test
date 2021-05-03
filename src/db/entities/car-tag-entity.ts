import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CarEntity } from './car-entity';

@Entity({ name: CarTagEntity.TableName })
export class CarTagEntity {
  public static readonly TableName = 'car_tags';

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => CarEntity, (game) => game.tags)
  @JoinColumn({ name: 'car_id' })
  game: CarTagEntity;

  constructor(title: string = null) {
    this.title = title;
  }
}
