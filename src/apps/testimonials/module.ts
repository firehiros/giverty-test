import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import TestimonialEntity from './entity/index.entity';
import MainService from './service';
import MainController from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestimonialEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export default class MainModule {}
