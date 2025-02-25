"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMovieStore } from "@/store/movieStore";
import movieService from "@/services/movieService";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";

export default function Home() {
    const { searchParams, resetSearchParams } = useMovieStore();

    // 컴포넌트 언마운트 시 검색 파라미터 초기화
    useEffect(() => {
        return () => resetSearchParams();
    }, [resetSearchParams]);

    // 영화 목록 조회 쿼리
    const { data, isLoading, isError } = useQuery({
        queryKey: ["movies", searchParams],
        queryFn: () => movieService.getMovies(searchParams),
    });

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                    쿠키 포키 - 영화 쿠키 정보 서비스
                </h1>

                <SearchBar />

                {isLoading ? (
                    <div className="flex justify-center my-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : isError ? (
                    <div className="text-center my-12 text-red-500">
                        데이터를 불러오는 중 오류가 발생했습니다.
                    </div>
                ) : (
                    <>
                        {data?.data.length === 0 ? (
                            <div className="text-center my-12 text-gray-500 dark:text-gray-400">
                                영화 데이터가 없습니다.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                                {data?.data.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        )}

                        {data?.meta && data.meta.totalPages > 1 && (
                            <Pagination
                                currentPage={data.meta.currentPage}
                                totalPages={data.meta.totalPages}
                            />
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
