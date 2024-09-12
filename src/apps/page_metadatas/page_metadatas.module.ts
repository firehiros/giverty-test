import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { PageMetadataEntity } from './entity/index';
import MainService from './page_metadatas.service';
import MainController from './page_metadatas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PageMetadataEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export default class MainModule {}
