import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetMoviesQueryDTO {
  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsBoolean()
  hasCookie?: boolean;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}
