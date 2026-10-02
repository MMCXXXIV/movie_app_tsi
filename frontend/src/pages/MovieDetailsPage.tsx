import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieService";
import type { MovieDetails } from "../types/movie";
import { imageURL } from "../utils/image";
import fallback from "../assets/fallback.png";
import "../styles/pages/MovieDetailsPage.scss";
import { Badge, Group, Rating, Stack, Text, Title } from "@mantine/core";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      const movieId = Number(id);

      if (!id || Number.isNaN(movieId)) {
        setError("Wrong Movie ID");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await getMovieDetails(movieId);
        setMovie(response);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  function adjustRating(rating: number) {
    return (rating / 10) * 5;
  }

  return (
    <div>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : movie ? (
        <div className="movie-details">
          <img
            className="movie-details__image"
            src={movie.poster_path ? imageURL(movie.poster_path) : fallback}
            alt={movie.title}
          />
          <Stack gap="md" className="movie-details__information">
            <Title>{movie.title}</Title>
            {movie.tagline && <Text>{movie.tagline}</Text>}
            <Group wrap="wrap">
              <Text>Release: {movie.release_date}</Text>
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
              <Text>Rating: {movie.vote_average}</Text>
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
