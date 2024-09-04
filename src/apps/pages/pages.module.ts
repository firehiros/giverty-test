import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { PageEntity } from './entity/index';
import MainService from './pages.service';
import MainController from './pages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PageEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export default class MainModule {}
