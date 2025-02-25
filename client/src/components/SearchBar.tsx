"use client";

import { useState } from "react";
import { useMovieStore } from "@/store/movieStore";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
    const { searchParams, setSearchParams } = useMovieStore();
    const [searchTerm, setSearchTerm] = useState(searchParams.search || "");

    // 검색어 입력 핸들러
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ ...searchParams, search: searchTerm, page: 1 });
    };

    // 검색어 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // 검색어 초기화
    const handleClear = () => {
        setSearchTerm("");
        setSearchParams({ ...searchParams, search: "", page: 1 });
    };

    return (
        <form onSubmit={handleSearch} className="mb-6">
            <div className="relative flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="영화 제목 검색..."
                    className="w-full px-4 py-3 pl-10 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassIcon className="absolute left-3 w-5 h-5 text-gray-400" />

                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-14 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                )}

                <button
                    type="submit"
                    className="absolute right-3 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                    검색
                </button>
            </div>
        </form>
    );
}
