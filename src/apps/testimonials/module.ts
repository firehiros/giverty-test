import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import ServiceEntity from './entity';
import MainService from './service';
import MainController from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  controllers: [MainController],
  providers: [MainService],
})
  
export default class MainModule {}
