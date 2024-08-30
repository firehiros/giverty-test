import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { typeOrmConfig } from './config/db';
import AuthModule from '@apps/auth/auth.module';
import ProfileModule from '@apps/profile/profile.module';
import UserModule from '@apps/user/user.module';
import ProviderModule from './apps/providers/module';
import SettingModule from './apps/settings/module';
import ServiceModule from './apps/services/module';
import TestimonialModule from './apps/testimonials/module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ProfileModule,
    UserModule,
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
