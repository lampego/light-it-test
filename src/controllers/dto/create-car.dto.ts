import {
  IsDate,
  IsDecimal,
  IsInt,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCarDto {
  @IsInt()
  manufacturerId: number;

  @Length(10, 20)
  title: string;

  @IsDecimal()
  @Min(0)
  price: number;

  @IsDate()
  releaseDate: Date;

  @MaxLength(30, {
    each: true,
  })
  tags?: string[];
}
