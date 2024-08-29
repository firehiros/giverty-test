import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Resource
import { JWT_CONFIG } from '@config/constants';
import { UserModule } from '@apps/user/user.module';
// import { RedisModule } from '@services/redis/redis.module';
import { TwoFactorService } from '@services/two-factor/2fa.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { BasicStrategy } from './strategy/basic.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'basic' }),
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: {
        expiresIn: JWT_CONFIG.expiresIn,
      },
    }),
    // RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BasicStrategy, TwoFactorService],
  exports: [AuthService, PassportModule],
})
export default class MainModule {}
