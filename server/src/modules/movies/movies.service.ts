import { Injectable, NotFoundException } from '@nestjs/common';
import { eq, like, and, desc, sql } from 'drizzle-orm';
import { DrizzleService } from 'src/infra/db/drizzle.service';
import { MovieSearch, movies } from 'src/infra/db/schema';

@Injectable()
export class MoviesService {
  constructor(private drizzle: DrizzleService) {}

  async findAll(params: MovieSearch) {
    const { query, hasCookie, page = 1, limit = 10 } = params;
    const offset = (page - 1) * limit;

    const conditions: any[] = [];

    if (query) {
      conditions.push(like(movies.title, `%${query}%`));
    }

    if (hasCookie !== undefined) {
      conditions.push(eq(movies.hasCookie, hasCookie));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [moviesResult, countResult] = await Promise.all([
      this.drizzle.db
        .select()
        .from(movies)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(movies.releaseYear)),

      this.drizzle.db
        .select({ count: sql<number>`count(*)` })
        .from(movies)
        .where(whereClause),
    ]);

    const totalCount = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: moviesResult,
      meta: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
      },
    };
  }

  async findOne(id: number) {
    const result = await this.drizzle.db
      .select()
      .from(movies)
      .where(eq(movies.id, id))
      .limit(1);

    if (result.length === 0) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return result[0];
  }

  async create(data: any) {
    // 필수 필드 확인
    if (!data.title || data.releaseYear === undefined) {
      throw new Error('Title and releaseYear are required fields');
    }

    // 필수 필드만 추출
    const movieData = {
      title: data.title,
      releaseYear: data.releaseYear,
      posterUrl: data.posterUrl,
      cookieCount: data.cookieCount || 0,
      hasCookie: data.hasCookie || false,
      description: data.description,
    };

    const result = await this.drizzle.db
      .insert(movies)
      .values(movieData)
      .returning();

    return result[0];
  }

  async update(id: number, data: any) {
    // 업데이트할 필드만 추출
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.releaseYear !== undefined)
      updateData.releaseYear = data.releaseYear;
    if (data.posterUrl !== undefined) updateData.posterUrl = data.posterUrl;
    if (data.cookieCount !== undefined)
      updateData.cookieCount = data.cookieCount;
    if (data.hasCookie !== undefined) updateData.hasCookie = data.hasCookie;
    if (data.description !== undefined)
      updateData.description = data.description;

    const result = await this.drizzle.db
      .update(movies)
      .set(updateData)
      .where(eq(movies.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return result[0];
  }

  async remove(id: number) {
    const result = await this.drizzle.db
      .delete(movies)
      .where(eq(movies.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return result[0];
  }
}
