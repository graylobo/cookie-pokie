import {
  pgTable,
  serial,
  varchar,
  boolean,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// 영화 테이블 정의
export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  releaseYear: integer('release_year').notNull(),
  posterUrl: varchar('poster_url', { length: 1000 }),
  cookieCount: integer('cookie_count').notNull().default(0),
  hasCookie: boolean('has_cookie').notNull().default(false),
  description: varchar('description', { length: 2000 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Drizzle-Zod 스키마 생성
export const insertMovieSchema = createInsertSchema(movies);
export const selectMovieSchema = createSelectSchema(movies);

// 영화 검색 스키마
export const searchMovieSchema = z.object({
  query: z.string().optional(),
  hasCookie: z.boolean().optional(),
  page: z.coerce.number().optional().default(1),
  limit: z.coerce.number().optional().default(10),
});

// 타입 추출
export type Movie = z.infer<typeof selectMovieSchema>;
export type NewMovie = z.infer<typeof insertMovieSchema>;
export type MovieSearch = z.infer<typeof searchMovieSchema>;
