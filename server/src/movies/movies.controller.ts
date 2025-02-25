import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { insertMovieSchema, searchMovieSchema } from '../db/schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(@Query(new ZodValidationPipe(searchMovieSchema)) query: any) {
    return this.moviesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Post()
  async create(@Body(new ZodValidationPipe(insertMovieSchema)) data: any) {
    return this.moviesService.create(data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.moviesService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
