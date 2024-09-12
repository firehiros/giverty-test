import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { LanguageEntity } from './entity/index';
import MainService from './languages.service';
import MainController from './languages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export default class MainModule {}
