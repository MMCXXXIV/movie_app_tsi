import type { Movie } from "../types/movie";
import { imageURL } from "../utils/image";
import "../styles/components/MovieCard.scss";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <img src={imageURL(movie.poster_path)} alt={movie.title} />
    </div>
  );
};

export default MovieCard;
