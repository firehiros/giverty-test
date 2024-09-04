import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { MESSAGES, AUTH_ERROR } from '@messages/index';

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@config/constants';

export class ChangePasswordDto {
  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(MAX_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(PASSWORD_REGEX, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'Current Password is mandatory',
  })
  currentPassword: string;

  @IsString()
  @MinLength(MIN_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(MAX_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(PASSWORD_REGEX, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'New Password is mandatory',
  })
  newPassword: string;

  @IsOptional()
  @IsNumber({}, { message: MESSAGES.MSG_002('メッセージ') })
  @Transform(({ value }) => Number(value))
  otpToken: number;
}
