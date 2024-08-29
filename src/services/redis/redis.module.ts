import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
import { REDIS_CONFIG } from '@config/constants';

@Module({
  imports: [],
  providers: [
    {
      provide: 'REDIS_CONNECTION',
      useFactory: async (): Promise<Redis> => {
        const connection = new Redis(REDIS_CONFIG.uri);
        return connection;
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
