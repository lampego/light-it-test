import { Length } from "class-validator";

export class CreateCarDto {
  @Length(10, 20)
  name: string;

  age: number;

  breed: string;
}
