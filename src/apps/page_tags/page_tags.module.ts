import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { PageTagEntity } from './entity/index';
import MainService from './page_tags.service';
import MainController from './page_tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PageTagEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export default class MainModule {}
