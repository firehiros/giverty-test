import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Query,
} from '@nestjs/common';

import MainService from './service';

@Controller('site_config')
class MainController {
  constructor(private readonly service: MainService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  find() {
    return this.service.find();
  }

  @Put()
  update(@Body() dto) {
    return this.service.update(dto);
  }
}

export default MainController;
