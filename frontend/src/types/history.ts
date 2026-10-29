import type { Movie } from "./movie";

export interface HistoryEntry {
  id: number;
  movie: Movie;
  watched_at: string;
}
