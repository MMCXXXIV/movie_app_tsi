import type { HistoryEntry } from "../types/history";
import { apiClient } from "./api";

export async function getHistory(): Promise<HistoryEntry[]> {
  const response = await apiClient.get<HistoryEntry[]>("/movies/history/");
  return response.data;
}

export async function addToHistory(movieId: number): Promise<HistoryEntry> {
  const response = await apiClient.post<HistoryEntry>("/movies/history/", {
    movie_id: movieId,
  });
  return response.data;
}

export async function removeFromHistory(entryId: number): Promise<void> {
  await apiClient.delete(`/movies/history/${entryId}/`);
}
