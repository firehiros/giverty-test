import {
  IsDate,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNumberString,
  Length,
} from 'class-validator';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@config/constants';
import { Transform, Type } from 'class-transformer';
import { Match } from '@decorators/index';
import { MESSAGES, AUTH_ERROR } from '@messages/index';

export class ResetPasswordDto {
  @IsNotEmpty({
    message: 'ConfirmationCode is mandatory',
  })
  @IsNumberString()
  @Length(5, 5, {
    message: MESSAGES.MSG_002('確認コード'),
  })
  confirmationCode: string;

  @IsNotEmpty({
    message: 'DateOfBirth is mandatory',
  })
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty({
    message: 'Password is mandatory',
  })
  @MinLength(MIN_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(MAX_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(PASSWORD_REGEX, {
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
  @Matches(PASSWORD_REGEX, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Match(ResetPasswordDto, (s) => s.password, {
    message: AUTH_ERROR.PASSWORD_NOT_MATCH,
  })
  @Transform(({ value }) => value.trim())
  confirmPassword: string;
}
