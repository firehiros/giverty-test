import { HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

// Source
import { JWT_CONFIG } from '@config/constants';
// import { RedisService } from '@services/redis/redis.service';
import { REDIS_PREFIX } from '../auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG.secret,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    try {
      // const key = `${REDIS_PREFIX}${payload.id}`;
      // const check = await this.redisService.get(key);
      // if (!check) {
      //   return done(
      //     new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED),
      //     false,
      //   );
      // }
      return done(null, payload);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
  private static extractJWT(request: Request): string | null {
    if (
      request.cookies &&
      'token' in request.cookies &&
      request.cookies.token.length > 0
    ) {
      return request.cookies.token;
    }
    return null;
  }
}
