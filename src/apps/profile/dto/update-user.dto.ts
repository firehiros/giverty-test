import { ApiProperty } from '@nestjs/swagger';
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
import { Gender, LanguageCode } from '@utils/enum';
import { MESSAGES } from '@messages/index';

export class UpdateUserDto {
  @ApiProperty({
    example: 'America',
  })
  @IsString()
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Country'),
  })
  country: string;

  @ApiProperty({
    example: Gender.MALE,
    enum: Gender,
  })
  @IsOptional()
  gender: Gender;

  @ApiProperty({
    example: "St. Mark's Place",
  })
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

  @ApiProperty({
    example: '84',
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Phone Code'),
  })
  phoneCode: string;

  @ApiProperty({
    example: '0877483744',
  })
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

  @ApiProperty({
    example: 'Manhattan',
  })
  @IsOptional()
  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'District',
      maxValue: 200,
    }),
  })
  district: string;

  @ApiProperty({
    example: 'NewYork',
  })
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

  @ApiProperty({
    example: 'east–west Mohawk River Valley',
  })
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Region'),
  })
  region: string;

  @ApiProperty({
    example: 'vi',
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsEnum(LanguageCode)
  language: LanguageCode;

  @ApiProperty({
    example: '09988',
  })
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

  @ApiProperty({
    example: '34 наслаждайся моментом',
  })
  @MaxLength(200, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Street No',
      maxValue: 200,
    }),
  })
  @IsString()
  @IsOptional()
  streetNo: string;

  @ApiProperty({
    example: "St. Mark's Place",
  })
  @IsString()
  @MaxLength(50, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Apartment',
      maxValue: 50,
    }),
  })
  @IsOptional()
  apartment: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: MESSAGES.MSG_002('メッセージ') })
  @Transform(({ value }) => Number(value))
  otpToken: number;
}
