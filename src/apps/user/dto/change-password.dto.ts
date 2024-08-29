import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AUTH_ERROR } from '@messages/index';
import { PASSWORD_REG } from '../user.constant';
import { Transform } from 'class-transformer';
import { MESSAGES } from '@messages/index';

export class ChangePasswordDto {
  @ApiProperty({
    minimum: 8,
    maximum: 35,
    description: MESSAGES.MSG_035,
  })
  @IsString()
  @MinLength(8, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(35, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(PASSWORD_REG, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'Current Password is mandatory',
  })
  currentPassword: string;

  @ApiProperty({
    minimum: 8,
    maximum: 35,
    description: MESSAGES.MSG_035,
  })
  @IsString()
  @MinLength(8, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(35, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(PASSWORD_REG, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({
    message: 'New Password is mandatory',
  })
  newPassword: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: MESSAGES.MSG_002('メッセージ') })
  @Transform(({ value }) => Number(value))
  otpToken: number;
}
