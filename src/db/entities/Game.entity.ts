import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PublisherEntity } from './Publisher.entity';

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  @ManyToOne(() => PublisherEntity, (publisher) => publisher.games)
  publisher: PublisherEntity;

  @Column()
  tags: string;

  @Column()
  releaseDate: Date;
}
