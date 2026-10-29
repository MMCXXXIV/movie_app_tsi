import type { UserMovieEntry } from "../types/watchlist";
import { apiClient } from "./api";

export async function getWatchlist(): Promise<UserMovieEntry[]> {
  const response = await apiClient.get<UserMovieEntry[]>("/movies/watchlist/");

  return response.data;
}

export async function addToWatchlist(movieId: number): Promise<UserMovieEntry> {
  const response = await apiClient.post<UserMovieEntry>("/movies/watchlist/", {
    movie_id: movieId,
  });

  return response.data;
}

export async function removeFromWatchlist(entryId: number): Promise<void> {
  await apiClient.delete(`/movies/watchlist/${entryId}/`);
}
