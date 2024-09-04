import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import SettingEntity from './entity/index.entity';
import MainService from './settings.service';
import MainController from './settings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export default class MainModule {}
