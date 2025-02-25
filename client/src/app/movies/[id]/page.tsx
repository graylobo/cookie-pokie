"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import movieService from "@/services/movieService";
import Header from "@/components/Header";

export default function MovieDetail() {
    const params = useParams();
    const router = useRouter();
    const movieId = Number(params.id);
    const [imageError, setImageError] = useState(false);

    // 영화 상세 정보 조회 쿼리
    const {
        data: movie,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["movie", movieId],
        queryFn: () => movieService.getMovie(movieId),
        enabled: !!movieId,
    });

    // 잘못된 ID로 접근 시 홈으로 리다이렉트
    useEffect(() => {
        if (isError) {
            router.push("/");
        }
    }, [isError, router]);

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:underline"
                >
                    <ArrowLeftIcon className="h-4 w-4 mr-1" />
                    목록으로 돌아가기
                </Link>

                {isLoading ? (
                    <div className="flex justify-center my-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : movie ? (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="md:flex">
                            <div className="md:w-1/3 relative h-96 md:h-auto">
                                {movie.posterUrl && !imageError ? (
                                    <Image
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 min-h-96">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            이미지 없음
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 md:w-2/3">
                                <div className="flex justify-between items-start mb-4">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                        {movie.title}
                                    </h1>
                                    <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                                        {movie.releaseYear}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <div
                                        className={`inline-block px-3 py-1 rounded-full text-sm ${
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

                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                        설명
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                        {movie.description ||
                                            "설명이 없습니다."}
                                    </p>
                                </div>

                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <p>
                                        등록일:{" "}
                                        {new Date(
                                            movie.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        수정일:{" "}
                                        {new Date(
                                            movie.updatedAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center my-12 text-red-500">
                        영화 정보를 불러오는데 실패했습니다.
                    </div>
                )}
            </div>
        </main>
    );
}
