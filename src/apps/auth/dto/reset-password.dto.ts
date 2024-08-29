import { ApiProperty } from '@nestjs/swagger';
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
import { PASSWORD_REGEX } from '@config/constants';
import { Transform, Type } from 'class-transformer';
import { Match } from '@decorators/index';
import { MESSAGES, AUTH_ERROR } from '@messages/index';

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'ConfirmationCode is mandatory',
  })
  @IsNumberString()
  @Length(5, 5, {
    message: MESSAGES.MSG_002('確認コード'),
  })
  confirmationCode: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'DateOfBirth is mandatory',
  })
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({
    minimum: 8,
    maximum: 35,
    description:
      'パスワードは半角文字、大文字、数字、特殊文字を含む必要があります。',
  })
  @IsString()
  @IsNotEmpty({
    message: 'Password is mandatory',
  })
  @MinLength(8, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(35, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(PASSWORD_REGEX, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  password: string;

  @ApiProperty({
    minimum: 8,
    maximum: 35,
    description: MESSAGES.MSG_035,
  })
  @IsString()
  @IsNotEmpty({
    message: 'Confirm Password is mandatory',
  })
  @MinLength(8, { message: AUTH_ERROR.PASSWORD_MIN_LENGTH })
  @MaxLength(127, { message: AUTH_ERROR.PASSWORD_MAX_LENGTH })
  @Matches(PASSWORD_REGEX, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  @Match(ResetPasswordDto, (s) => s.password, {
    message: AUTH_ERROR.PASSWORD_NOT_MATCH,
  })
  confirmPassword: string;
}
