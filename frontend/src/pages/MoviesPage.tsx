import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { getPopularMovies, searchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import "../styles/pages/MoviesPage.scss";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getPopularMovies().then((res) => setMovies(res.results));
  }, []);

  function handleSearch() {
    if (search.trim() === "") return;
    searchMovies(search).then((res) => setMovies(res.results));
  }

  return (
    <div className="movies-page">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
      />
      <button onClick={handleSearch}>Search</button>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesPage;
