"use client";

import { create } from "zustand";
import { MovieSearchParams } from "@/types/movie";

interface MovieStore {
    searchParams: MovieSearchParams;
    setSearchParams: (params: MovieSearchParams) => void;
    resetSearchParams: () => void;
}

export const useMovieStore = create<MovieStore>((set) => ({
    searchParams: {
        page: 1,
        search: "",
    },

    setSearchParams: (params) =>
        set((state) => ({
            searchParams: { ...state.searchParams, ...params },
        })),

    resetSearchParams: () =>
        set({
            searchParams: {
                page: 1,
                search: "",
            },
        }),
}));
