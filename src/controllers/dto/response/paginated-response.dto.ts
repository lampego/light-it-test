import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import PaginatedResponseItemDto from './paginated-response-item.dto';

export class PaginatedResponseDto<T extends PaginatedResponseItemDto> {
  public page: number;

  public totalPages: number;

  public totalItems: number;

  public items: Array<T>;

  public static async create<T, Entity>(
    query: SelectQueryBuilder<ObjectLiteral>,
    page: number,
    onPrepareModels: (entity: Entity) => PaginatedResponseItemDto,
    pageSize = 20,
  ): Promise<PaginatedResponseDto<PaginatedResponseItemDto>> {
    const paginatedModel = new PaginatedResponseDto();

    paginatedModel.page = page < 1 ? 1 : page;
    const offset = pageSize * (paginatedModel.page - 1);
    const result = await query.limit(pageSize).offset(offset).getManyAndCount();

    paginatedModel.items = result[0].map(onPrepareModels);
    paginatedModel.totalItems = result[1];
    paginatedModel.totalPages = Math.ceil(paginatedModel.totalItems / pageSize);
    return Promise.resolve(paginatedModel);
  }
}
