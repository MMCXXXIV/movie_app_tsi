from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Movie, Watchlist


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
        movie = Movie.objects.get(tmdb_id=movie_id)

        return Watchlist.objects.create(
            movie=movie,
            **validated_data,
        )
