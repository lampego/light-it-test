import {
  IsDate,
  IsInt,
  IsNumber,
  Length,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @IsInt()
  @Type(() => Number)
  manufacturerId: number;

  @Length(1, 20)
  title: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsDate()
  @Type(() => Date)
  releaseDate: Date;

  @MaxLength(30, {
    each: true,
  })
  tags?: string[];
}
