import PaginatedResponseItemDto from '../paginated-response-item.dto';
import { CarEntity } from '../../../../db/entities/car-entity';
import { ManufacturerResponseDto } from './manufacturer-response.dto';

export class CarResponseDto extends PaginatedResponseItemDto {
  id: number;

  title: string;

  price: number;

  releaseDate: string;

  manufacturer: ManufacturerResponseDto;

  constructor(entity: CarEntity) {
    super();
    this.id = entity.id;
    this.title = entity.title;
    this.price = entity.price;
    this.releaseDate = entity.releaseDate.toISOString();
    this.manufacturer = new ManufacturerResponseDto(entity.manufacturer);
  }
}
