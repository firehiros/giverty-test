import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import ProviderEntity from './entity/provider.entity';
import ProviderService from './service';
import ProviderController from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProviderEntity])],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export default class ProviderModule {}
