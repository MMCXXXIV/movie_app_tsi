import type { UserMovieEntry } from "../types/watchlist";
import { apiClient } from "./api";

export async function getFavorites(): Promise<UserMovieEntry[]> {
  const response = await apiClient.get<UserMovieEntry[]>("/movies/favorites/");
  return response.data;
}

export async function addToFavorites(movieId: number): Promise<UserMovieEntry> {
  const response = await apiClient.post<UserMovieEntry>("/movies/favorites/", {
    movie_id: movieId,
  });
  return response.data;
}

export async function removeFromFavorites(entryId: number): Promise<void> {
  await apiClient.delete(`/movies/favorites/${entryId}/`);
}
