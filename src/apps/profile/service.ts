import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entity
import { User } from '@apps/user/entities/user.entity';

// Services
// import {
//   MailParams,
//   SendEmailService,
// } from '@services/send-email/send-email.service';
// import { AuthService } from '../auth/auth.service';
import { TwoFactorService } from '@services/two-factor/2fa.service';
import { MESSAGES, USER_ERROR, EMAIL_TITLE } from '@messages/index';

// DTO
import { SignInDto } from '../auth/dto/signin.dto';
import { SendMailDto } from './dto/send-mail.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignUpDto } from '../auth/dto/signup.dto';

// Share
import { StringUtil } from '@utils/index';
import { encryptPassword, isPasswordMatch } from '@utils/index';

import { TwoFaDto } from '@apps/auth/dto/two-fa.dto';

@Injectable()
export class ProfileService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private readonly sendEmailService: SendEmailService,
    private readonly jwtService: JwtService,
    // @InjectRepository(Language)
    // private readonly languageRepository: Repository<Language>,
    // @Inject(forwardRef(() => AuthService))
    // private authService: AuthService,
    private readonly twoFactorService: TwoFactorService,
  ) {}

  private sanitizeUser(user: User): Partial<User> {
    return {
      id: user.id,
      email: user.email,
    };
  }

  async onModuleInit() {}

  async find(userId: string) {
    try {
      const userFound = await this.userRepository.findOneBy({ id: userId });
      if (!userFound) {
        throw new HttpException(
          USER_ERROR.USER_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }
      let result: any = this.sanitizeUser(userFound);

      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, param: any) {
    const result = await this.userRepository.save({
      id,
      ...param,
    });
    return result;
  }

  //api change email
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    try {
      const user = await this.userRepository.findOneBy({
        id: userId,
      });

      if (!user)
        throw new HttpException(
          USER_ERROR.USER_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );

      const { newPassword, currentPassword } = changePasswordDto;

      if (!(await isPasswordMatch(currentPassword, user.password)))
        throw new HttpException(
          USER_ERROR.WRONG_PASSWORD,
          HttpStatus.BAD_REQUEST,
        );

      if (await isPasswordMatch(newPassword, user.password))
        throw new HttpException(
          USER_ERROR.OLD_PASSWORD,
          HttpStatus.BAD_REQUEST,
        );

      const newHashedPassword = await encryptPassword(newPassword);
      const { lastName: name, email: to } = user;
      const dataPendingToSend: SendMailDto = {
        type: `change-password`,
        data: {
          name,
        },
        to,
        subject: EMAIL_TITLE.CHANGE_PASSWORD,
      };

      await this.twoFactorService.validate(user.id, changePasswordDto.otpToken);
      user.password = newHashedPassword;

      await this.userRepository.save(user);

      // await this.sendMail(dataPendingToSend);
      // await this.authService.logout(userId);

      return {
        dataPendingToSend,
        message: MESSAGES.PASSWORD_UPDATED,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async enabled2Fa(userId: string, dto: TwoFaDto) {
    try {
      const userFound = await this.userRepository.findOneBy({ id: userId });
      if (!userFound) throw new HttpException('', HttpStatus.NOT_FOUND);
      // if (!this.verifyTwoFa(userFound, dto)) {
      //   throw new HttpException('The token is invalid', HttpStatus.BAD_REQUEST);
      // }
      await this.userRepository.save({ id: userFound.id, is2FAEnabled: true });
      return 'Success';
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  verifyTwoFa(user: User, dto: TwoFaDto) {
    try {
      const isValid = this.twoFactorService.verifyOTPToken({
        token: dto.otpToken.toString(),
        secret: user.faSecret,
      });
      return isValid;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
