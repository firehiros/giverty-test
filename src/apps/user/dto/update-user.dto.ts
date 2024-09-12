import {
  IsString,
  MaxLength,
  IsOptional,
  IsNumberString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  MinLength,
  IsDate,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Gender } from '@utils/enum';
import { MESSAGES } from '@messages/index';

export class UpdateUserDto {
  // First Name
  @IsNotEmpty({
    message: 'FirstName is mandatory',
  })
  @IsString()
  @MinLength(1, { message: 'FirstName must be at least 1 characters long' })
  @MaxLength(127, { message: 'FirstName can be max 127 characters long' })
  @Transform(({ value }) => value.trim())
  firstName: string;

  // Last Name
  @IsNotEmpty({
    message: 'LastName is mandatory',
  })
  @IsString()
  @MinLength(1, { message: 'LastName must be at least 1 characters long' })
  @MaxLength(127, { message: 'LastName can be max 127 characters long' })
  @Transform(({ value }) => value.trim())
  lastName: string;

  // Date of Birth
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsOptional()
  gender: Gender;

  @IsString()
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Country'),
  })
  country: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(50, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Postcode',
      maxValue: 50,
    }),
  })
  postcode: string;

  @IsOptional()
  @MaxLength(50, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Region',
      maxValue: 200,
    }),
  })
  region: string;

  @IsOptional()
  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'City',
      maxValue: 200,
    }),
  })
  city: string;

  @IsOptional()
  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Address',
      maxValue: 200,
    }),
  })
  address: string;

  @IsOptional()
  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Building',
      maxValue: 200,
    }),
  })
  building: string;

  @IsOptional()
  @IsNumberString()
  phoneCode: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(50, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Phone number',
      maxValue: 50,
    }),
  })
  phoneNumber: string;

  @IsOptional()
  @IsNumber({}, { message: MESSAGES.MSG_002('メッセージ') })
  @Transform(({ value }) => Number(value))
  otpToken: number;
}
