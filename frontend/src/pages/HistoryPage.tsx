import { useEffect, useState } from "react";
import { Alert, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { getHistory } from "../services/historyService";
import type { HistoryEntry } from "../types/history";
import { imageURL } from "../utils/image";
import fallback from "../assets/fallback.png";

const HistoryPage = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await getHistory();
        setHistory(response);
      } catch {
        setError("Could not load viewing history. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    void fetchHistory();
  }, []);

  if (loading) {
    return <Text>Loading viewing history...</Text>;
  }

  return (
    <div>
      <Title order={1} mb="md">
        Viewing History
      </Title>

      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

      {history.length === 0 ? (
        <Text>You haven't watched any movies yet.</Text>
      ) : (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="md">
          {history.map((entry) => (
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

              <Text size="sm" c="dimmed" mt="xs">
                Watched: {new Date(entry.watched_at).toLocaleString()}
              </Text>
            </div>
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default HistoryPage;
