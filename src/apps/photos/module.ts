import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import PhotoEntity from './entity';
import MainService from './service';
import MainController from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export default class MainModule {}
