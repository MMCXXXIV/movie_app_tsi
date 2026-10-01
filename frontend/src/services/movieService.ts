import type { MovieDetails, PopularMoviesResponse } from "../types/movie";
import { apiClient } from "./api";

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
  const response = await apiClient.get<PopularMoviesResponse>(
    "/movies/popular/"
  );

  return response.data;
}

export async function searchMovies(
  search: string
): Promise<PopularMoviesResponse> {
  const response = await apiClient.get<PopularMoviesResponse>(
    "/movies/search/",
    {
      params: {
        query: search,
      },
    }
  );

  return response.data;
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  const response = await apiClient.get<MovieDetails>(`/movies/tmdb/${id}/`);

  return response.data;
}
