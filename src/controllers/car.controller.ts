import { Body, Controller, Get, HttpException, Post, Query } from "@nestjs/common";
import { CreateCarDto } from './dto/create-car.dto';
import { ManufacturersDao } from '../db/dao/manufacturers-dao.service';
import { GetCarsListDto } from './dto/get-cars-list.dto';

@Controller('car')
export class CarController {
  constructor(private ManufacturersDao: ManufacturersDao) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    const isExistsManufacturer = await this.ManufacturersDao.exists(
      createCarDto.manufacturerId,
    );
    if (!isExistsManufacturer) {
      return new HttpException('Incorrect "manufacturerId"', 403);
    }
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: GetCarsListDto) {
    return `This action returns all cats (limit: ${query.page} items)`;
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
