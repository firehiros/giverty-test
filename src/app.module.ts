import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { typeOrmConfig } from './configs/db.config';
import ProviderModule from './apps/providers/module';
import SiteConfigModule from './apps/site_config/module';
import SystemConfigModule from './apps/system_config/module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProviderModule,
    SiteConfigModule,
    SystemConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
