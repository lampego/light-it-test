import { Controller, Get, Post } from "@nestjs/common";

@Controller()
export class CarController {
  constructor() {
  }

  @Post()
  create(@Body() createCarDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action returns all cats (limit: ${query.limit} items)`;
  // }
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
