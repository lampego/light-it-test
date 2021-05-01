import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { PublisherEntity } from './Publisher.entity';
import { GameTagEntity } from './GameTag.entity';

@Entity({ name: GameEntity.TableName })
export class GameEntity {
  public static readonly TableName = 'cars';

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column({ name: 'release_date' })
  releaseDate: Date;

  @ManyToOne(() => PublisherEntity, (publisher) => publisher.games)
  @JoinColumn({ name: 'publisher_id' })
  publisher: PublisherEntity;

  @OneToMany(() => GameEntity, (tag) => tag.tags)
  tags: GameTagEntity;
}
