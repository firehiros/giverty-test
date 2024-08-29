import { ApiProperty } from '@nestjs/swagger';
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

export class SignUpDto {
  @ApiProperty({ type: 'email' })
  @IsNotEmpty({
    message: 'Email is mandatory',
  })
  @IsEmail({}, { message: 'Email incorrect. Please try again!' })
  @MinLength(8, { message: MESSAGES.MSG_033('Eメール', 8) })
  @MaxLength(127, { message: MESSAGES.MSG_034('Eメール', 127) })
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty({
    minimum: 8,
    maximum: 35,
    description: MESSAGES.MSG_035,
  })
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
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: AUTH_ERROR.PASSWORD_INCLUDE,
  })
  @Transform(({ value }) => value.trim())
  @Match(SignUpDto, (s) => s.password, {
    message: 'Password and Confirm password do not match. Please try again',
  })
  confirmPassword: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Country is mandatory',
  })
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'FirstName is mandatory',
  })
  @IsString()
  @MinLength(1, { message: MESSAGES.MSG_033('お名前（姓）', 1) })
  @MaxLength(127, { message: MESSAGES.MSG_034('お名前（姓）', 127) })
  @Transform(({ value }) => value.trim())
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'LastName is mandatory',
  })
  @IsString()
  @MinLength(1, { message: MESSAGES.MSG_033('お名前（名）', 1) })
  @MaxLength(127, { message: MESSAGES.MSG_034('お名前（名）', 127) })
  @Transform(({ value }) => value.trim())
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'DateOfBirth is mandatory',
  })
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({
    example: 111111,
  })
  @IsOptional()
  @IsNumber()
  affiliateCode: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'RecaptchaResponse is mandatory',
  })
  @IsString()
  recaptchaResponse: string;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => JSON.parse(value))
  termsAndCondition: boolean;
}
