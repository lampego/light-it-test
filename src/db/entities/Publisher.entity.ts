import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GameEntity } from './Game.entity';

@Entity({ name: PublisherEntity.TableName })
export class PublisherEntity {
  public static readonly TableName = 'publishers';

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  siret: number;

  @Column()
  phone: string;

  @OneToMany(() => GameEntity, (game) => game.publisher)
  games: GameEntity;
}
