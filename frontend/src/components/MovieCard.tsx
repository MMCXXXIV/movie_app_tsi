import { Link } from "react-router-dom";
import { Card, Image, Text, Title, Rating, Stack } from "@mantine/core";
import type { Movie } from "../types/movie";
import { imageURL } from "../utils/image";
import fallback from "../assets/fallback.png";
import "../styles/components/MovieCard.scss";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card
      component={Link}
      to={`/movies/${movie.id}`}
      className="movie-card"
      padding="sm"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
          src={movie.poster_path ? imageURL(movie.poster_path) : fallback}
          alt={movie.title}
          className="movie-card__poster"
          fallbackSrc={fallback}
        />
      </Card.Section>

      <Stack gap="xs" mt="sm">
        <Title order={4} className="movie-card__title">
          {movie.title}
        </Title>

        <Text size="sm" c="dimmed" className="movie-card__overview">
          {movie.overview || "No description available."}
        </Text>

        <Rating value={(movie.vote_average / 10) * 5} fractions={2} readOnly />

        <Text size="xs" c="dimmed">
          {movie.release_date?.slice(0, 4) || "Release date unknown"}
        </Text>
      </Stack>
    </Card>
  );
};

export default MovieCard;
