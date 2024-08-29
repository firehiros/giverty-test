import * as moment from 'moment';
import { Global, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Controllers
import { UserController } from './user.controller';

// Services
import { UserService } from './user.service';

// Entities
import { User } from './entities/user.entity';

// Modules

// Share
import { JWT_CONFIG } from '@config/constants';
import { EXPIRED_TIME } from './user.constant';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_CONFIG.secret,
      signOptions: {
        expiresIn: moment().add(EXPIRED_TIME, 'minutes').unix(),
      },
    }),
    // RedisModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
