import * as moment from 'moment';
import { Global, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Resource
import { JWT_CONFIG, LOGIN_EXPIRED_MINUTES } from '@config/constants';
import { TwoFactorService } from '@services/two-factor/2fa.service';
import { User } from '@apps/user/entities/user.entity';
import { JwtStrategy } from '@apps/auth/strategy/jwt.strategy';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: {
        expiresIn: moment().add(LOGIN_EXPIRED_MINUTES, 'minutes').unix(),
      },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, JwtStrategy, TwoFactorService],
  exports: [ProfileService],
})
export default class ProfileModule {}
