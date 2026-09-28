import type { Movie } from "../types/movie";
import { imageURL } from "../utils/image";
import "../styles/components/MovieCard.scss";

type MovieCardProps = {
  movie: Movie;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <h2 className="title">{movie.title}</h2>
      <p className="description">{movie.overview}</p>
      <img
        className="poster"
        src={imageURL(movie.poster_path)}
        alt={movie.title}
      />
    </div>
  );
};

export default MovieCard;
