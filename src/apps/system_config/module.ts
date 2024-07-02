import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { SystemConfigEntity } from './entity/system_config.entity';
import MainService from './service';
import MainController from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([SystemConfigEntity])],
  controllers: [MainController],
  providers: [MainService],
})
export default class MainModule {}
