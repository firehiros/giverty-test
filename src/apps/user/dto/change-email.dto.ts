import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { Match } from '@decorators/index';
import { MESSAGES } from '@messages/index';

export class ChangeEmailDto {
  @ApiProperty({
    description: 'Email account',
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Eメール'),
  })
  @IsEmail({}, { message: MESSAGES.MSG_043('Eメール') })
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty({
    description: 'Confirm Email',
  })
  @IsNotEmpty({
    message: 'Confirm Email is mandatory',
  })
  @IsEmail({}, { message: MESSAGES.MSG_043('Eメール') })
  @Transform(({ value }) => value.trim())
  @Match(ChangeEmailDto, (s) => s.email, {
    message: 'Confirm Email and Email do not match, please try again! ',
  })
  confirmEmail: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: MESSAGES.MSG_002('OTPコード') })
  @Transform(({ value }) => Number(value))
  otpToken: number;
}
