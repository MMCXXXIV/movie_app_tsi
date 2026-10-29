import type { Movie } from "./movie";

export interface UserMovieEntry {
  id: number;
  movie: Movie;
  created_at: string;
}
