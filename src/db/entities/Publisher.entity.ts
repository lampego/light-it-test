import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GameEntity } from './Game.entity';

@Entity()
export class PublisherEntity {
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