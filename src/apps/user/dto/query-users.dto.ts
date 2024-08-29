import { IsNumber, IsOptional, Min, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryTransactionDto {
  @ApiProperty()
  @Min(1)
  @IsNumber({}, { message: 'Not is number' })
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiProperty()
  @IsOptional()
  search: string;
}
