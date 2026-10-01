import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieService";
import type { MovieDetails } from "../types/movie";
import { imageURL } from "../utils/image";
import fallback from "../assets/fallback.png";
import "../styles/pages/MovieDetailsPage.scss";

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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : movie ? (
        <div className="movie-details">
          <img
            className="movie-details__image"
            src={movie.poster_path ? imageURL(movie.poster_path) : fallback}
            alt={movie.title}
          />
          <div className="movie-details__information">
            <h2>{movie.title}</h2>
            <p>{movie.tagline}</p>
            <p>
              {movie.release_date} | {movie.runtime} | {movie.status}
            </p>
            {movie.genres.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
            <p>
              {movie.vote_average} / {movie.vote_count}
            </p>
            <p>{movie.overview}</p>
          </div>
        </div>
      ) : (
        <p>No movie to render</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
