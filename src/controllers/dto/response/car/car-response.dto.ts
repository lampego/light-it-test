import PaginatedResponseItemDto from '../paginated-response-item.dto';
import { CarEntity } from '../../../../db/entities/car-entity';
import { ManufacturerResponseDto } from './manufacturer-response.dto';
import * as _ from 'lodash';

export class CarResponseDto extends PaginatedResponseItemDto {
  id: number;

  title: string;

  price: number;

  releaseDate: string;

  tags: string[] = [];

  manufacturer: ManufacturerResponseDto;

  constructor(entity: CarEntity) {
    super();

    this.id = entity.id;
    this.title = entity.title;
    this.price = entity.price;
    this.releaseDate =
      entity.releaseDate instanceof Date
        ? entity.releaseDate.toISOString()
        : `${entity.releaseDate}`;
    this.manufacturer = new ManufacturerResponseDto(entity.manufacturer);

    if (entity.tags) {
      this.tags = _.map(entity.tags, (item) => {
        return item.title;
      });
    }
  }
}
