from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Favorite, Movie, ViewingHistory, Watchlist
from .services.tmdb import TMDBService

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class WatchlistSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    movie_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Watchlist
        fields = ["id", "movie", "movie_id", "created_at"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        movie_id = validated_data.pop("movie_id")

        movie = Movie.objects.filter(tmdb_id=movie_id).first()

        if not movie:
            tmdb_movie = TMDBService().get_movie_details(movie_id)

            movie = Movie.objects.create(
                tmdb_id=tmdb_movie["id"],
                title=tmdb_movie["title"],
                overview=tmdb_movie.get("overview", ""),
                release_date=tmdb_movie.get("release_date") or None,
                poster_path=tmdb_movie.get("poster_path") or "",
                backdrop_path=tmdb_movie.get("backdrop_path") or "",
                rating=tmdb_movie.get("vote_average", 0),
                vote_count=tmdb_movie.get("vote_count", 0),
            )

        return Watchlist.objects.create(
            movie=movie,
            **validated_data,
        )

class FavoriteSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    movie_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Favorite
        fields = ["id", "movie", "movie_id", "created_at"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        movie_id = validated_data.pop("movie_id")

        movie = Movie.objects.filter(tmdb_id=movie_id).first()

        if not movie:
            tmdb_movie = TMDBService().get_movie_details(movie_id)

            movie = Movie.objects.create(
                tmdb_id=tmdb_movie["id"],
                title=tmdb_movie["title"],
                overview=tmdb_movie.get("overview", ""),
                release_date=tmdb_movie.get("release_date") or None,
                poster_path=tmdb_movie.get("poster_path") or "",
                backdrop_path=tmdb_movie.get("backdrop_path") or "",
                rating=tmdb_movie.get("vote_average", 0),
                vote_count=tmdb_movie.get("vote_count", 0),
            )

        return Favorite.objects.create(
            movie=movie,
            **validated_data,
        )

class ViewingHistorySerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    movie_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = ViewingHistory
        fields = ["id", "movie", "movie_id", "watched_at"]
        read_only_fields = ["id", "watched_at"]

    def create(self, validated_data):
        movie_id = validated_data.pop("movie_id")

        movie = Movie.objects.filter(tmdb_id=movie_id).first()

        if not movie:
            tmdb_movie = TMDBService().get_movie_details(movie_id)

            movie = Movie.objects.create(
                tmdb_id=tmdb_movie["id"],
                title=tmdb_movie["title"],
                overview=tmdb_movie.get("overview", ""),
                release_date=tmdb_movie.get("release_date") or None,
                poster_path=tmdb_movie.get("poster_path") or "",
                backdrop_path=tmdb_movie.get("backdrop_path") or "",
                rating=tmdb_movie.get("vote_average", 0),
                vote_count=tmdb_movie.get("vote_count", 0),
            )

        return ViewingHistory.objects.create(
            movie=movie,
            **validated_data,
        )
