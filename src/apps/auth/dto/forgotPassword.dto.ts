import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { MESSAGES } from '@messages/index';

export class ForgotPasswordDto {
  @ApiProperty({ type: 'email' })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Email'),
  })
  @IsEmail({}, { message: MESSAGES.MSG_043('Email') })
  @MinLength(8, {
    message: MESSAGES.MSG_003({ field: 'Email', minValue: 8 }),
  })
  @MaxLength(127, {
    message: MESSAGES.MSG_004({ field: 'Email', maxValue: 127 }),
  })
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: MESSAGES.MSG_001('RecaptchaResponse'),
  })
  @IsString()
  recaptchaResponse: string;
}
