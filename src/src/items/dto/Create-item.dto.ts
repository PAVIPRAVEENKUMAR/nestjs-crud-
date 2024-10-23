import { IsString, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateItemDto {
  @Transform(({ value }) => parseInt(value))
  @IsString()
  name: string;
  @IsInt()
  @Min(18)
  @Max(99)
  quantity: number;
  
  @IsString()
  description: string;
}