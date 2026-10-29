import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieService";
import type { MovieDetails } from "../types/movie";
import { imageURL } from "../utils/image";
import fallback from "../assets/fallback.png";
import "../styles/pages/MovieDetailsPage.scss";
import {
  Alert,
  Badge,
  Button,
  Group,
  Rating,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../services/watchlistService";
import type { UserMovieEntry } from "../types/watchlist";
import { useAuth } from "../hooks/useAuth";
import {
  addToFavorites,
  getFavorites,
  removeFromFavorites,
} from "../services/favoritesService";
import {
  addToHistory,
  getHistory,
  removeFromHistory,
} from "../services/historyService";
import type { HistoryEntry } from "../types/history";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [watchlist, setWatchlist] = useState<UserMovieEntry[] | null>(null);
  const [watchlistLoading, setWatchlistLoading] = useState(false);

  const [favorite, setFavorite] = useState<UserMovieEntry[] | null>(null);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchMovieDetails() {
      const currentMovieId = Number(id);

      setMovie(null);
      setError(null);
      setLoading(true);
      setWatchlist(null);
      setWatchlistLoading(user !== null);
      setFavorite(null);
      setFavoriteLoading(user !== null);
      setHistory(null);
      setHistoryLoading(user !== null);

      if (!id || !Number.isInteger(currentMovieId) || currentMovieId <= 0) {
        setError("Wrong Movie ID");
        setLoading(false);
        setWatchlistLoading(false);
        setFavoriteLoading(false);
        setHistoryLoading(false);
        return;
      }

      try {
        const response = await getMovieDetails(currentMovieId);

        if (cancelled) return;
        setMovie(response);

        if (user !== null) {
          const [watchlistResponse, favoriteResponse, historyResponse] =
            await Promise.all([getWatchlist(), getFavorites(), getHistory()]);

          if (cancelled) return;

          setWatchlist(watchlistResponse);
          setFavorite(favoriteResponse);
          setHistory(historyResponse);
        } else {
          setWatchlist([]);
          setFavorite([]);
          setHistory([]);
        }
      } catch {
        if (!cancelled) {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setWatchlistLoading(false);
          setFavoriteLoading(false);
          setHistoryLoading(false);
        }
      }
    }

    void fetchMovieDetails();

    return () => {
      cancelled = true;
    };
  }, [id, user]);

  function adjustRating(rating: number) {
    return (rating / 10) * 5;
  }

  const movieId = Number(id);

  const watchlistEntry =
    watchlist?.find((entry) => entry.movie.tmdb_id === movieId) ?? null;
  const isInWatchlist = watchlistEntry !== null;

  const favoriteEntry =
    favorite?.find((entry) => entry.movie.tmdb_id === movieId) ?? null;
  const isInFavorite = favoriteEntry !== null;

  const historyEntry =
    history?.find((entry) => entry.movie.tmdb_id === movieId) ?? null;
  const isInHistory = historyEntry !== null;

  async function handleAddToWatchlist() {
    if (!id || watchlist === null || watchlistLoading) return;

    setError(null);
    setWatchlistLoading(true);

    try {
      if (watchlistEntry) {
        await removeFromWatchlist(watchlistEntry.id);
        setWatchlist(
          (current) =>
            current?.filter((item) => item.id !== watchlistEntry.id) ?? []
        );
      } else {
        const newEntry = await addToWatchlist(movieId);
        setWatchlist((current) => [...(current ?? []), newEntry]);
      }
    } catch {
      setError("Could not update your watchlist. Please try again.");

      try {
        setWatchlist(await getWatchlist());
      } catch {
        setWatchlist(null);
      }
    } finally {
      setWatchlistLoading(false);
    }
  }

  async function handleAddToFavorite() {
    if (!id || favorite === null || favoriteLoading) return;

    setError(null);
    setFavoriteLoading(true);

    try {
      if (favoriteEntry) {
        await removeFromFavorites(favoriteEntry.id);
        setFavorite(
          (current) =>
            current?.filter((item) => item.id !== favoriteEntry.id) ?? []
        );
      } else {
        const newEntry = await addToFavorites(movieId);
        setFavorite((current) => [...(current ?? []), newEntry]);
      }
    } catch {
      setError("Could not update your favorites. Please try again.");

      try {
        setFavorite(await getFavorites());
      } catch {
        setFavorite(null);
      }
    } finally {
      setFavoriteLoading(false);
    }
  }

  async function handleToggleHistory() {
    if (!user || !id || history === null || historyLoading) return;

    setError(null);
    setHistoryLoading(true);

    try {
      if (historyEntry) {
        await removeFromHistory(historyEntry.id);
        setHistory(
          (current) =>
            current?.filter((entry) => entry.id !== historyEntry.id) ?? []
        );
      } else {
        const newEntry = await addToHistory(movieId);
        setHistory((current) => [...(current ?? []), newEntry]);
      }
    } catch {
      setError("Could not update viewing history. Please try again.");

      try {
        setHistory(await getHistory());
      } catch {
        setHistory(null);
      }
    } finally {
      setHistoryLoading(false);
    }
  }

  return (
    <div>
      {loading ? (
        <Text>Loading...</Text>
      ) : error && !movie ? (
        <Text>{error}</Text>
      ) : movie ? (
        <div className="movie-details">
          <img
            className="movie-details__image"
            src={movie.poster_path ? imageURL(movie.poster_path) : fallback}
            alt={movie.title}
          />

          <Stack gap="md" className="movie-details__information">
            <Group justify="space-between">
              <Title>{movie.title}</Title>

              {user && (
                <Group>
                  <Button
                    onClick={() => void handleAddToWatchlist()}
                    loading={watchlistLoading}
                    disabled={watchlist === null}
                  >
                    Watchlist:{" "}
                    {watchlistLoading
                      ? "Loading..."
                      : isInWatchlist
                      ? "Remove"
                      : "Add"}
                  </Button>

                  <Button
                    onClick={() => void handleAddToFavorite()}
                    loading={favoriteLoading}
                    disabled={favorite === null}
                  >
                    Favorite:{" "}
                    {favoriteLoading
                      ? "Loading..."
                      : isInFavorite
                      ? "Remove"
                      : "Add"}
                  </Button>

                  <Button
                    onClick={() => void handleToggleHistory()}
                    loading={historyLoading}
                    disabled={history === null}
                    variant={isInHistory ? "filled" : "light"}
                  >
                    {isInHistory ? "Remove from history" : "Mark as watched"}
                  </Button>
                </Group>
              )}
            </Group>

            {error && <Alert color="red">{error}</Alert>}

            {movie.tagline && <Text>{movie.tagline}</Text>}

            <Group wrap="wrap">
              <Text>Release: {movie.release_date || "Unknown"}</Text>
              <Text>Runtime: {movie.runtime} min</Text>
              <Text>Status: {movie.status}</Text>
            </Group>

            <Group gap="xs">
              {movie.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </Group>

            <Group>
              <Rating value={adjustRating(movie.vote_average)} readOnly />
              <Text>Rating: {movie.vote_average.toFixed(1)} / 10</Text>
              <Text>Votes: {movie.vote_count}</Text>
            </Group>

            <Text>{movie.overview}</Text>
          </Stack>
        </div>
      ) : (
        <Text>No movie to render</Text>
      )}
    </div>
  );
};

export default MovieDetailsPage;
