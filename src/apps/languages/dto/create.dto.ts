import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { MESSAGES } from '@messages/index';
import { PageDirection } from '@utils/enum';

export class CreateDto {
  @IsString()
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Name'),
  })
  @MaxLength(255, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Name',
      maxValue: 255,
    }),
  })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsString()
  @MaxLength(255, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Code',
      maxValue: 255,
    }),
  })
  @Transform(({ value }) => value.trim())
  code: string;

  @IsBoolean()
  is_default: boolean;

  @IsEnum(PageDirection)
  direction: string;
}
