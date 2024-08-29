import * as moment from 'moment';
import { Global, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Resource
import { JWT_CONFIG, LOGIN_EXPIRED_MINUTES } from '@config/constants';

// Modules

// Controllers
import { ProfileController } from './controller';

// Services
import { ProfileService } from './service';
import { TwoFactorService } from '@services/two-factor/2fa.service';

// Entities
import { User } from '@apps/user/entities/user.entity';
import { JwtStrategy } from '@apps/auth/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

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
