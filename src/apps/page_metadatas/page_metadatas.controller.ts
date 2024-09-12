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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Source
import MainService from './page_metadatas.service';

@Controller('pages/:page/metadatas')
class MainController {
  constructor(private readonly service: MainService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() query, @Param('page') pageId: string) {
    return this.service.findAll(pageId, query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Param('page') pageId: string, @Body() dto) {
    return this.service.create(pageId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('page') pageId: string, @Param('id') id: string) {
    return this.service.findOne(pageId, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('page') pageId: string, @Param('id') id: string, @Body() dto) {
    return this.service.update(pageId, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

export default MainController;
