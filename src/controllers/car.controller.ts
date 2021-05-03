import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCarDto } from './dto/request/car/create-car.dto';
import { ManufacturersDao } from '../db/dao/manufacturers-dao.service';
import { GetCarsListDto } from './dto/request/car/get-cars-list.dto';
import { PaginatedResponseDto } from './dto/response/paginated-response.dto';
import { CarListItemDto } from './dto/response/car/car-list-item.dto';
import { CarEntity } from '../db/entities/car-entity';

@Controller('car')
export class CarController {
  constructor(private manufacturersDao: ManufacturersDao) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    const isExistsManufacturer = await this.manufacturersDao.exists(
      createCarDto.manufacturerId,
    );
    if (!isExistsManufacturer) {
      return new HttpException('Incorrect "manufacturerId"', 422);
    }
    return 'This action adds a new cat';
  }

  @Get()
  async findAll(@Query() query: GetCarsListDto) {
    const getItemsQuery = await this.manufacturersDao.findAllQuery();
    const response = await PaginatedResponseDto.create<
      CarListItemDto,
      CarEntity
    >(getItemsQuery, query.page, (item) => {
      return new CarListItemDto(item);
    });
    return response;
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return `This action returns a #${id} cat`;
  // }
  //
  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} cat`;
  // }
}
