import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsEmail,
  IsDate,
  MinLength,
  IsBoolean,
  Matches,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

// Share
import { MESSAGES, AUTH_ERROR } from '@messages/index';
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@config/constants';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends PartialType(UpdateUserDto) {
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
  @MinLength(MIN_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(MAX_PASSWORD_LENGTH, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(PASSWORD_REGEX, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  password: string;
}
