import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Match } from '@decorators/index';
import { MESSAGES, AUTH_ERROR } from '@messages/index';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '@config/constants';

export class SignUpDto {
  @IsNotEmpty({
    message: 'Email is mandatory',
  })
  @IsEmail({}, { message: 'Email incorrect. Please try again!' })
  @MinLength(8, { message: MESSAGES.MSG_033('Eメール', 8) })
  @MaxLength(127, { message: MESSAGES.MSG_034('Eメール', 127) })
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Password is mandatory',
  })
  @MinLength(8, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(127, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  password: string;

  @IsString()
  @IsNotEmpty({
    message: 'Confirm Password is mandatory',
  })
  @MinLength(MIN_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(MAX_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  @Match(SignUpDto, (s) => s.password, {
    message: 'Password and Confirm password do not match. Please try again',
  })
  confirmPassword: string;

  @IsNotEmpty({
    message: 'FirstName is mandatory',
  })
  @IsString()
  @MinLength(1, { message: MESSAGES.MSG_033('お名前（姓）', 1) })
  @MaxLength(127, { message: MESSAGES.MSG_034('お名前（姓）', 127) })
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsNotEmpty({
    message: 'LastName is mandatory',
  })
  @IsString()
  @MinLength(1, { message: MESSAGES.MSG_033('お名前（名）', 1) })
  @MaxLength(127, { message: MESSAGES.MSG_034('お名前（名）', 127) })
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsOptional()
  @IsNumber()
  affiliateCode: number;

  @IsNotEmpty({
    message: 'RecaptchaResponse is mandatory',
  })
  @IsString()
  recaptchaResponse: string;

  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  termsAndCondition: boolean;
}
