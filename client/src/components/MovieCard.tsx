"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { useState } from "react";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
            <div className="relative h-64 w-full">
                {movie.posterUrl && !imageError ? (
                    <Image
                        src={movie.posterUrl}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <span className="text-gray-500 dark:text-gray-400">
                            이미지 없음
                        </span>
                    </div>
                )}

                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs">
                    {movie.releaseYear}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                    {movie.title}
                </h3>

                <div className="flex items-center mb-3">
                    <div
                        className={`px-2 py-1 rounded-full text-xs ${
                            movie.hasCookie
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                    >
                        {movie.hasCookie
                            ? `쿠키 ${movie.cookieCount}개`
                            : "쿠키 없음"}
                    </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                    {movie.description || "설명이 없습니다."}
                </p>

                <Link
                    href={`/movies/${movie.id}`}
                    className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
                >
                    상세보기
                </Link>
            </div>
        </div>
    );
}
