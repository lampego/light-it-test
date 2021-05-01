import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GameEntity } from './Game.entity';

@Entity({ name: GameTagEntity.TableName })
export class GameTagEntity {
  public static readonly TableName = 'game_tags';

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => GameEntity, (game) => game.tags)
  @JoinColumn({ referencedColumnName: 'game_id' })
  game: GameTagEntity;
}
