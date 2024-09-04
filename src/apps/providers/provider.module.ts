import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import ProviderEntity from './entity/provider.entity';
import ProviderService from './provider.service';
import ProviderController from './provider.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderEntity])],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export default class ProviderModule {}
