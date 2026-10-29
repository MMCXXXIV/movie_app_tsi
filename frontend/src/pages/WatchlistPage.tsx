import { useEffect, useState } from "react";
import { Alert, Button, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  getWatchlist,
  removeFromWatchlist,
} from "../services/watchlistService";
import type { UserMovieEntry } from "../types/watchlist";
import { imageURL } from "../utils/image";
import fallback from "../assets/fallback.png";

const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<UserMovieEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const response = await getWatchlist();
        setWatchlist(response);
      } catch {
        setError("Could not load your watchlist. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void fetchWatchlist();
  }, []);

  async function handleRemove(entryId: number) {
    try {
      await removeFromWatchlist(entryId);
      setWatchlist((current) =>
        current.filter((entry) => entry.id !== entryId)
      );
    } catch {
      setError("Could not remove this movie from your watchlist.");
    }
  }

  if (loading) {
    return <Text>Loading watchlist...</Text>;
  }

  return (
    <div>
      <Title order={1} mb="md">
        Watchlist
      </Title>

      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      {watchlist.length === 0 ? (
        <Text>Your watchlist is empty.</Text>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
          {watchlist.map((entry) => (
            <div key={entry.id}>
              <Link to={`/movies/${entry.movie.tmdb_id}`}>
                <img
                  src={
                    entry.movie.poster_path
                      ? imageURL(entry.movie.poster_path)
                      : fallback
                  }
                  alt={entry.movie.title}
                  style={{ width: "100%", borderRadius: 8 }}
                />
                <Text fw={500} mt="xs">
                  {entry.movie.title}
                </Text>
              </Link>

              <Button
                color="red"
                variant="light"
                mt="xs"
                onClick={() => void handleRemove(entry.id)}
              >
                Remove from watchlist
              </Button>
            </div>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default WatchlistPage;
