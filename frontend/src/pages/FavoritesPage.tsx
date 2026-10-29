import { useEffect, useState } from "react";
import { Alert, Button, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  getFavorites,
  removeFromFavorites,
} from "../services/favoritesService";
import type { UserMovieEntry } from "../types/watchlist";
import { imageURL } from "../utils/image";
import fallback from "../assets/fallback.png";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<UserMovieEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await getFavorites();
        setFavorites(response);
      } catch {
        setError("Could not load favorites. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void fetchFavorites();
  }, []);

  async function handleRemove(entryId: number) {
    try {
      await removeFromFavorites(entryId);
      setFavorites((current) =>
        current.filter((entry) => entry.id !== entryId)
      );
    } catch {
      setError("Could not remove this favorite. Please try again.");
    }
  }

  if (loading) return <Text>Loading favorites...</Text>;

  return (
    <div>
      <Title order={1} mb="md">
        Favorites
      </Title>

      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      {favorites.length === 0 ? (
        <Text>You haven't added any favorites yet.</Text>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
          {favorites.map((entry) => (
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
                Remove favorite
              </Button>
            </div>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default FavoritesPage;
