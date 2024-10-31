import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Source
import { typeOrmConfig } from '@config/db';
import GivertyModule from '@apps/giverty.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GivertyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
