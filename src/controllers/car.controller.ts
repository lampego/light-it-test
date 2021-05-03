import {
  Body,
  Controller,
  Get,
  HttpException, HttpStatus, Param,
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
import * as _ from "lodash";
import { CarTagEntity } from "../db/entities/car-tag-entity";

@Controller('car')
export class CarController {
  constructor(
    private manufacturersDao: ManufacturersDao,
    private carsDao: CarsDao,
  ) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    const manufacturer = await this.manufacturersDao.findOne(
      createCarDto.manufacturerId,
    );
    if (!manufacturer) {
      throw new HttpException(
        'Incorrect "manufacturerId"',
        HttpStatus.BAD_REQUEST,
      );
    }
    let newCar = new CarEntity();
    newCar.title = createCarDto.title;
    newCar.price = createCarDto.price;
    newCar.releaseDate = createCarDto.releaseDate;
    newCar.tags = [];
    _.forEach(createCarDto.tags, (tag) => {
      newCar.tags.push(new CarTagEntity(tag));
    });

    newCar.manufacturer = manufacturer;
    newCar = await this.carsDao.save(newCar);
    return new CarResponseDto(newCar);
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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const car = await this.carsDao.findOne(id);
    if (!car) {
      throw new HttpException('Incorrect "id"', HttpStatus.BAD_REQUEST);
    }
    return new CarResponseDto(car);
  }

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
