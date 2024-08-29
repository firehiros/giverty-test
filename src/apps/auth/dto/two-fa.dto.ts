import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { MESSAGES } from '@messages/index';

export class TwoFaDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'OtpToken is mandatory',
  })
  @IsNumber({}, { message: MESSAGES.MSG_002('OTPコード') })
  @Transform(({ value }) => Number(value))
  otpToken: number;
}
