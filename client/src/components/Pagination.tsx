"use client";

import { useMovieStore } from "@/store/movieStore";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({
    currentPage,
    totalPages,
}: PaginationProps) {
    const { searchParams, setSearchParams } = useMovieStore();

    // 페이지 변경 핸들러
    const handlePageChange = (page: number) => {
        setSearchParams({ ...searchParams, page });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 페이지 번호 배열 생성
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center items-center my-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-700 mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="이전 페이지"
            >
                <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 mx-1 rounded-md ${
                        currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-700 ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="다음 페이지"
            >
                <ChevronRightIcon className="h-5 w-5" />
            </button>
        </div>
    );
}
