import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Delete,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

// Services
import { GivertyService } from './giverty.service';

// Guards

// Share

@Controller('recipes')
export class GivertyController {
  constructor(private givertyService: GivertyService) {}

  @Post()
  @HttpCode(200)
  create(@Body() dto: any) {
    return this.givertyService.create(dto);
  }

  @Get()
  @HttpCode(200)
  async list() {
    return this.givertyService.list();
  }

  @Get(':id')
  @HttpCode(200)
  find(@Param('id') id: number) {
    return this.givertyService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateData: any) {
    return this.givertyService.update(id, updateData);
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id') id: number) {
    return this.givertyService.remove(id);
  }
}
