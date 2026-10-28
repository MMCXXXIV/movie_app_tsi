import type { Movie } from "./movie";

export interface WatchlistEntry {
  id: number;
  movie: Movie;
  created_at: string;
}
