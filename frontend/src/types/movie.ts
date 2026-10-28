export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  tmdb_id: number;
}

export interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: Genre[];
  tagline: string | null;
  status: string;
}

export type Genre = {
  id: number;
  name: string;
};

export type AuthMe = {
  id: number;
  username: string;
  email: string;
};
