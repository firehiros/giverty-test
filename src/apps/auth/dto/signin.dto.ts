import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { MESSAGES, AUTH_ERROR } from '@messages/index';

export class SignInDto {
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Eメール'),
  })
  @IsEmail({}, { message: MESSAGES.MSG_043('Eメール') })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Password is mandatory',
  })
  @MinLength(8, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(35, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  password: string;

  @IsString()
  recaptchaResponse: string;
}
