import {
  IsString,
  MaxLength,
  IsOptional,
  IsNumberString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Gender } from '@utils/enum';
import { MESSAGES } from '@messages/index';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Country'),
  })
  country: string;

  @IsOptional()
  gender: Gender;

  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Street',
      maxValue: 200,
    }),
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Street'),
  })
  street: string;

  @IsNotEmpty({
    message: MESSAGES.MSG_001('Phone Code'),
  })
  phoneCode: string;

  @IsNumberString()
  @MaxLength(50, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Phone number',
      maxValue: 50,
    }),
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Phone Number'),
  })
  phoneNumber: string;

  @IsOptional()
  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'District',
      maxValue: 200,
    }),
  })
  district: string;

  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'City',
      maxValue: 200,
    }),
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('City'),
  })
  city: string;

  @IsNotEmpty({
    message: MESSAGES.MSG_001('Region'),
  })
  region: string;

  @IsNumberString()
  @MaxLength(50, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Postcode',
      maxValue: 50,
    }),
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Postcode'),
  })
  postcode: string;

  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Street No',
      maxValue: 200,
    }),
  })
  @IsString()
  @IsOptional()
  streetNo: string;

  @IsString()
  @MaxLength(50, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Apartment',
      maxValue: 50,
    }),
  })
  @IsOptional()
  apartment: string;

  @IsOptional()
  @IsNumber({}, { message: MESSAGES.MSG_002('メッセージ') })
  @Transform(({ value }) => Number(value))
  otpToken: number;
}
