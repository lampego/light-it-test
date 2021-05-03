import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCarsListDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;
}
