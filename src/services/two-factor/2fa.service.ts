/**
 * @module Two-Factor-Authentication
 * @description Two-Factor Authentication
 * @version 1.0.0
 */
import {
  Injectable,
  Inject,
  forwardRef,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import * as qrcode from 'qrcode';
// import { authenticator } from 'otplib';
import { UserService } from '@apps/user/user.service';
import { MESSAGES } from '@messages/index';

@Injectable()
export class TwoFactorService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}
  public generateSecret() {
    // return authenticator.generateSecret();
  }

  public generateOTPToken({
    username,
    serviceName,
    secret,
  }: {
    username: string;
    serviceName: string;
    secret: string;
  }) {
    // return authenticator.keyuri(username, serviceName, secret);
  }

  public verifyOTPToken({ token, secret }: { token: string; secret: string }) {
    // return authenticator.check(token, secret);
  }

  public async generateQRCode(otpAuth: string) {
    // try {
    //   const qrCodeImageUrl = await qrcode.toDataURL(otpAuth);
    //   return qrCodeImageUrl;
    // } catch (e) {
    //   return;
    // }
  }

  public async validate(userId: string, otpToken: number) {
    // const userFound = await this.userService.findUserById(userId);
    // if (userFound.is2FAEnabled) {
    //   if (!otpToken) {
    //     throw new HttpException(
    //       MESSAGES.MSG_001('OTPコード'),
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }
    //   if (
    //     !this.verifyOTPToken({
    //       token: otpToken.toString(),
    //       secret: userFound.faSecret,
    //     })
    //   ) {
    //     throw new HttpException(
    //       'You entered an incorrect code. Please try again',
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }
    // }
  }
}
