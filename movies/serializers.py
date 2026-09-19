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
    movie = serializers.SlugRelatedField(
        slug_field="tmdb_id",
        queryset=Movie.objects.all(),
    )

    class Meta:
        model = Watchlist
        fields = ["id", "movie", "created_at"]
        read_only_fields = ["id", "created_at"]
