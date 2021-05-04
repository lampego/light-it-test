import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCarDto } from './dto/request/car/create-car.dto';
import { ManufacturersDao } from '../db/dao/manufacturers-dao.service';
import { GetCarsListDto } from './dto/request/car/get-cars-list.dto';
import { PaginatedResponseDto } from './dto/response/paginated-response.dto';
import { CarResponseDto } from './dto/response/car/car-response.dto';
import { CarEntity } from '../db/entities/car-entity';
import { CarsDao } from '../db/dao/cars-dao.service';
import * as _ from 'lodash';
import { CarTagEntity } from '../db/entities/car-tag-entity';
import { CarTagsDao } from '../db/dao/car-tags-dao.service';

@Controller('car')
export class CarController {
  constructor(
    private manufacturersDao: ManufacturersDao,
    private carsDao: CarsDao,
    private carTagsDao: CarTagsDao,
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: CreateCarDto) {
    let car = await this.carsDao.findOne(id);
    if (!car) {
      throw new HttpException('Incorrect "id"', HttpStatus.BAD_REQUEST);
    }
    const manufacturer = await this.manufacturersDao.findOne(
      updateCarDto.manufacturerId,
    );
    if (!manufacturer) {
      throw new HttpException(
        'Incorrect "manufacturerId"',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Delete exists tags
    await this.carTagsDao.deleteForCar(car.id);

    car.title = updateCarDto.title;
    car.price = updateCarDto.price;
    car.releaseDate = updateCarDto.releaseDate;
    car.tags = [];
    _.forEach(updateCarDto.tags, (tag) => {
      car.tags.push(new CarTagEntity(tag));
    });

    car.manufacturer = manufacturer;
    car = await this.carsDao.save(car);
    return new CarResponseDto(car);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const car = await this.carsDao.findOne(id);
    if (!car) {
      throw new HttpException('Incorrect "id"', HttpStatus.BAD_REQUEST);
    }
    await this.carTagsDao.deleteForCar(car.id);
    await this.carsDao.remove(car.id);
    return true;
  }
}
