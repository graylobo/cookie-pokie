"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // 컴포넌트가 마운트된 후에만 테마 전환 버튼을 렌더링
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-bold text-blue-600 dark:text-blue-400"
                >
                    Cookie Pokie
                </Link>

                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                        홈
                    </Link>

                    {mounted && (
                        <button
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            aria-label="테마 전환"
                        >
                            {theme === "dark" ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
