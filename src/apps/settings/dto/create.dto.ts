import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDto {
  // ----------NAME--------- //
  @ApiProperty({
    type: String,
    required: true,
    example: 'Admin',
  })
  @IsNotEmpty({
    message: 'Name is mandatory',
  })
  @MinLength(1, { message: 'Name must be at least 1 characters long' })
  @MaxLength(127, { message: 'Name can be max 255 characters long' })
  @Transform(({ value }) => value.trim())
  key: string;

  // ---------------------- //
}
