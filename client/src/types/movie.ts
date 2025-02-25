export interface Movie {
    id: number;
    title: string;
    releaseYear: number;
    posterUrl?: string;
    cookieCount: number;
    hasCookie: boolean;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface MovieResponse {
    data: Movie[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: string;
        hasNextPage: boolean;
    };
}

export interface MovieSearchParams {
    page?: number;
    search?: string;
    hasCookie?: boolean;
}
