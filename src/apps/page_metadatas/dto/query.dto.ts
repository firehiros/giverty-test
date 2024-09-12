import { IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryDto {
  @Min(1)
  @IsNumber({}, { message: 'Not is number' })
  @Transform(({ value }) => Number(value))
  page: number;

  @Min(10)
  @IsNumber({}, { message: 'Not is number' })
  @Transform(({ value }) => Number(value))
  limit: number;
}
