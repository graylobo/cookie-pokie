import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

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
