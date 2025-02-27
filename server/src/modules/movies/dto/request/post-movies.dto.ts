import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class PostMoviesBodyDTO {
  @IsString()
  title: string;

  @IsNumber()
  releaseYear: number;

  @IsString()
  @IsOptional()
  posterUrl: string;

  @IsNumber()
  cookieCount: number;

  @IsBoolean()
  hasCookie: boolean;

  @IsString()
  @IsOptional()
  description: string;
}
