import { z } from "zod";

// 영화 쿠키 정보에 대한 스키마 정의
export const MovieSchema = z.object({
    id: z.number(),
    title: z.string(),
    releaseYear: z.number(),
    posterUrl: z.string().url().optional(),
    cookieCount: z.number().min(0),
    hasCookie: z.boolean(),
    description: z.string().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

// 영화 생성 스키마
export const CreateMovieSchema = MovieSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

// 영화 업데이트 스키마
export const UpdateMovieSchema = CreateMovieSchema.partial();

// 영화 검색 스키마
export const SearchMovieSchema = z.object({
    query: z.string().optional(),
    hasCookie: z.boolean().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
});

// 타입 추출
export type Movie = z.infer<typeof MovieSchema>;
export type CreateMovie = z.infer<typeof CreateMovieSchema>;
export type UpdateMovie = z.infer<typeof UpdateMovieSchema>;
export type SearchMovie = z.infer<typeof SearchMovieSchema>;
