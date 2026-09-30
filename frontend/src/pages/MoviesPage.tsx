import { useEffect, useState, type KeyboardEvent } from "react";
import type { Movie } from "../types/movie";
import { getPopularMovies, searchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import "../styles/pages/MoviesPage.scss";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const response = await getPopularMovies();
        setMovies(response.results);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  async function handleSearch() {
    if (search.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchMovies(search);
      setMovies(response.results);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="movies-page">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      )}
    </div>
  );
};

export default MoviesPage;
