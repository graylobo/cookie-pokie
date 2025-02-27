import { Movie, MovieResponse, MovieSearchParams } from "@/types/movie";

const API_URL = "http://localhost:4000/api";

// 검색 파라미터를 쿼리 문자열로 변환
const buildQueryString = (params: MovieSearchParams): string => {
    const queryParams = new URLSearchParams();

    if (params.page) {
        queryParams.append("page", params.page.toString());
    }

    if (params.search) {
        queryParams.append("query", params.search);
    }

    if (params.hasCookie !== undefined) {
        queryParams.append("hasCookie", params.hasCookie.toString());
    }

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : "";
};

// 영화 목록 조회
const getMovies = async (
    params: MovieSearchParams = {}
): Promise<MovieResponse> => {
    const queryString = buildQueryString(params);
    const response = await fetch(`${API_URL}/movies${queryString}`);

    if (!response.ok) {
        throw new Error("영화 목록을 불러오는데 실패했습니다.");
    }

    return response.json();
};

// 영화 상세 조회
const getMovie = async (id: number): Promise<Movie> => {
    const response = await fetch(`${API_URL}/movies/${id}`);

    if (!response.ok) {
        throw new Error("영화 정보를 불러오는데 실패했습니다.");
    }

    return response.json();
};

const movieService = {
    getMovies,
    getMovie,
};

export default movieService;
