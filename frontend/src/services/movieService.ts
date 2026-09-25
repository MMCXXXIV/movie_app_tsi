import type { PopularMoviesResponse } from "../types/movie";
import { apiClient } from "./api";

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
  const response = await apiClient.get<PopularMoviesResponse>(
    "/movies/popular/"
  );

  return response.data;
}
