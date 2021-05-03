import {
  Body,
  Controller,
  Get,
  HttpException, HttpStatus,
  Post,
  Query
} from "@nestjs/common";
import { CreateCarDto } from './dto/request/car/create-car.dto';
import { ManufacturersDao } from '../db/dao/manufacturers-dao.service';
import { GetCarsListDto } from './dto/request/car/get-cars-list.dto';
import { PaginatedResponseDto } from './dto/response/paginated-response.dto';
import { CarResponseDto } from './dto/response/car/car-response.dto';
import { CarEntity } from '../db/entities/car-entity';
import { CarsDao } from '../db/dao/cars-dao.service';

@Controller('car')
export class CarController {
  constructor(
    private manufacturersDao: ManufacturersDao,
    private carsDao: CarsDao,
  ) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    const isExistsManufacturer = await this.manufacturersDao.exists(
      createCarDto.manufacturerId,
    );
    if (!isExistsManufacturer) {
      throw new HttpException(
        'Incorrect "manufacturerId"',
        HttpStatus.BAD_REQUEST,
      );
    }
    return 'This action adds a new cat';
  }

  @Get()
  async findAll(@Query() query: GetCarsListDto) {
    const getItemsQuery = await this.carsDao.findAllQuery();
    const response = await PaginatedResponseDto.create<
      CarResponseDto,
      CarEntity
    >(getItemsQuery, query.page, (item) => {
      return new CarResponseDto(item);
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
