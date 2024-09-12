import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { MESSAGES } from '@messages/index';

export class CreateDto {
  @IsString()
  @IsNotEmpty({
    message: MESSAGES.MSG_001('Key'),
  })
  @MaxLength(255, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Key',
      maxValue: 255,
    }),
  })
  @Transform(({ value }) => value.trim())
  key: string;

  @IsString()
  @MaxLength(255, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Key',
      maxValue: 255,
    }),
  })
  @Transform(({ value }) => value.trim())
  label: string;

  @IsString()
  @IsNotEmpty({
    message: MESSAGES.MSG_REQUIRED('Value'),
  })
  @MaxLength(255, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Key',
      maxValue: 255,
    }),
  })
  @Transform(({ value }) => value.trim())
  value: string;

  @IsString()
  @MaxLength(255, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Description',
      maxValue: 255,
    }),
  })
  @Transform(({ value }) => value.trim())
  description: string;

  @IsString()
  @IsNotEmpty({
    message: MESSAGES.MSG_REQUIRED('Type'),
  })
  @MaxLength(255, {
    message: MESSAGES.MSG_MAX_LENGTH({
      field: 'Type',
      maxValue: 255,
    }),
  })
  @Transform(({ value }) => value.trim())
  type: string;
}
