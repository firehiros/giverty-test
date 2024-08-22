import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { typeOrmConfig } from './configs/db.config';
import ProviderModule from './apps/providers/module';
import SettingModule from './apps/settings/module';
import ServiceModule from './apps/services/module';
import TestimonialModule from './apps/testimonials/module';
// import SystemConfigModule from './apps/system_config/module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProviderModule,
    SettingModule,
    ServiceModule,
    TestimonialModule,
    // SystemConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
