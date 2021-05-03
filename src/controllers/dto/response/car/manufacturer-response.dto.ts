import PaginatedResponseItemDto from '../paginated-response-item.dto';
import { ManufacturerEntity } from '../../../../db/entities/manufacturer-entity';

export class ManufacturerResponseDto extends PaginatedResponseItemDto {
  id: number;

  name: string;

  siret: number;

  phone: string;

  constructor(entity: ManufacturerEntity) {
    super();
    this.id = entity.id;
    this.name = entity.name;
    this.siret = entity.siret;
    this.phone = entity.phone;
  }
}
