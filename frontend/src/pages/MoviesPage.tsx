import { useEffect, useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Loader,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import type { Movie } from "../types/movie";
import { getPopularMovies, searchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import "../styles/pages/MoviesPage.scss";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const response = await getPopularMovies();
        if (!cancelled) setMovies(response.results);
      } catch {
        if (!cancelled) setError("Could not load movies. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchMovies();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSearch(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const query = search.trim();
      const response = query
        ? await searchMovies(query)
        : await getPopularMovies();

      setMovies(response.results);
    } catch {
      setError("Could not search movies. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="movies-page">
      <section className="movies-page__header">
        <Title order={1} className="movies-page__title">
          Discover movies
        </Title>
        <Text c="dimmed" className="movies-page__subtitle">
          Find your next favorite film.
        </Text>

        <form className="movies-page__search" onSubmit={handleSearch}>
          <TextInput
            className="movies-page__search-input"
            placeholder="Search movies by title..."
            aria-label="Search movies by title"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            leftSection={<IconSearch size={18} />}
            size="md"
          />
          <Button type="submit" loading={loading} size="md">
            Search
          </Button>
        </form>
      </section>

      {error && (
        <Alert color="red" mb="lg" title="Something went wrong">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="movies-page__status">
          <Loader size="lg" />
          <Text c="dimmed">Loading movies...</Text>
        </div>
      ) : movies.length === 0 ? (
        <Text c="dimmed" ta="center" py="xl">
          No movies found. Try a different search.
        </Text>
      ) : (
        <SimpleGrid
          className="movies-page__grid"
          cols={{ base: 2, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
          spacing={{ base: "sm", sm: "lg" }}
          verticalSpacing="xl"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </SimpleGrid>
      )}
    </main>
  );
};

export default MoviesPage;
