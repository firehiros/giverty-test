import { ApiProperty } from '@nestjs/swagger';
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
import { Gender, LanguageCode } from '@utils/enum';
import { MESSAGES, AUTH_ERROR } from '@messages/index';
import { PASSWORD_REG } from '../user.constant';

export class CreateUserDto {
  // Email
  @ApiProperty({
    description: 'Email account',
  })
  @IsNotEmpty({
    message: 'Email is mandatory',
  })
  @IsEmail({}, { message: MESSAGES.MSG_043('現在パスワード') })
  @Transform(({ value }) => value.trim())
  email: string;

  // Password
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
    message: 'Password is mandatory',
  })
  password: string;

  // First Name
  @ApiProperty()
  @IsNotEmpty({
    message: 'FirstName is mandatory',
  })
  @IsString()
  @MinLength(1, { message: 'FirstName must be at least 1 characters long' })
  @MaxLength(127, { message: 'FirstName can be max 127 characters long' })
  @Transform(({ value }) => value.trim())
  firstName: string;

  // Last Name
  @ApiProperty()
  @IsNotEmpty({
    message: 'LastName is mandatory',
  })
  @IsString()
  @MinLength(1, { message: 'LastName must be at least 1 characters long' })
  @MaxLength(127, { message: 'LastName can be max 127 characters long' })
  @Transform(({ value }) => value.trim())
  lastName: string;

  // Date of Birth
  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  // Gender
  @ApiProperty({
    example: Gender.MALE,
  })
  @IsOptional()
  gender: Gender;

  // Country
  @ApiProperty({
    example: 'America',
  })
  @IsString()
  @IsOptional()
  country: string;

  // Postal Code
  @ApiProperty({
    example: '09988',
  })
  @IsOptional()
  @MaxLength(50, {
    message: MESSAGES.MSG_004({
      field: 'Postcode',
      maxValue: 50,
    }),
  })
  postcode: string;

  // Region
  @ApiProperty({
    example: 'east–west Mohawk River Valley',
  })
  @IsOptional()
  region: string;

  // City
  @ApiProperty({
    example: 'NewYork',
  })
  @MaxLength(200, {
    message: MESSAGES.MSG_004({
      field: 'City',
      maxValue: 200,
    }),
  })
  @IsOptional()
  city: string;

  // District
  @ApiProperty({
    example: 'Manhattan',
  })
  @IsOptional()
  @MaxLength(200, {
    message: MESSAGES.MSG_004({
      field: 'District',
      maxValue: 200,
    }),
  })
  district: string;

  // Street
  @ApiProperty({
    example: "St. Mark's Place",
  })
  @IsOptional()
  @MaxLength(200, {
    message: MESSAGES.MSG_004({
      field: 'Adress',
      maxValue: 200,
    }),
  })
  address: string;

  // Street No
  @ApiProperty({
    example: '34 Street Name',
  })
  @MaxLength(200, {
    message: MESSAGES.MSG_004({
      field: 'Street No',
      maxValue: 200,
    }),
  })
  @IsString()
  @IsOptional()
  streetNo: string;

  // Apartment No
  @ApiProperty({
    example: "St. Mark's Place",
  })
  @IsString()
  @MaxLength(50, {
    message: MESSAGES.MSG_004({
      field: 'Apartment',
      maxValue: 50,
    }),
  })
  @IsOptional()
  apartment: string;

  // Phone Code
  @ApiProperty({
    example: '84',
  })
  @IsOptional()
  phoneCode: string;

  // Phone
  @ApiProperty({
    example: '0877483744',
  })
  @IsOptional()
  @MaxLength(50, {
    message: MESSAGES.MSG_004({
      field: 'Phone number',
      maxValue: 50,
    }),
  })
  phoneNumber: string;

  // Language
  @ApiProperty({
    example: 'vi',
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  language: LanguageCode;

  // Is 2FA Enable
  @ApiProperty({
    example: 'false',
  })
  @IsBoolean()
  is2FAEnabled: boolean;

  // Is Verified
  @ApiProperty({
    example: 'false',
  })
  @IsBoolean()
  isVerified: boolean;

  // Is Information Updated
  @ApiProperty({
    example: 'false',
  })
  @IsBoolean()
  isInformationUpdated: boolean;
}
