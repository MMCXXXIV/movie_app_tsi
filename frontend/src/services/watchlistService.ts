import type { WatchlistEntry } from "../types/watchlist";
import { apiClient } from "./api";

export async function getWatchlist(): Promise<WatchlistEntry[]> {
  const response = await apiClient.get<WatchlistEntry[]>("/movies/watchlist/");

  return response.data;
}

export async function addToWatchlist(movieId: number): Promise<WatchlistEntry> {
  const response = await apiClient.post<WatchlistEntry>("/movies/watchlist/", {
    movie_id: movieId,
  });

  return response.data;
}

export async function removeFromWatchlist(entryId: number): Promise<void> {
  await apiClient.delete(`/movies/watchlist/${entryId}/`);
}
