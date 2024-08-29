import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { MESSAGES } from '@messages/index';

export class CheckEmailDto {
  @ApiProperty({ type: 'email' })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Eメール'),
  })
  @IsEmail({}, { message: MESSAGES.MSG_043('Eメール') })
  @Transform(({ value }) => value.trim())
  email: string;
}
