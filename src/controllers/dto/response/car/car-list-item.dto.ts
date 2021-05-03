import PaginatedResponseItemDto from '../paginated-response-item.dto';
import { CarEntity } from '../../../../db/entities/car-entity';

export class CarListItemDto extends PaginatedResponseItemDto {
  id: number;

  title: string;

  price: number;

  releaseDate: string;

  constructor(entity: CarEntity) {
    super();
    this.id = entity.id;
    this.title = entity.title;
    this.price = entity.price;
    this.releaseDate = entity.releaseDate.toISOString();
  }
}
