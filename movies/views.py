from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .services.tmdb import TMDBService

from rest_framework.permissions import IsAuthenticated

from .models import Favorite, Movie, Watchlist, ViewingHistory
from .serializers import FavoriteSerializer, MovieSerializer, WatchlistSerializer, ViewingHistorySerializer



class MovieListCreateView(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class MovieDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    lookup_field = "tmdb_id"


class PopularMoviesView(APIView):
    def get(self, request):
        page = request.query_params.get("page", 1)
        movies = TMDBService().get_popular_movies(page=page)
        return Response(movies)
    
class MovieSearchView(APIView):
    def get(self, request):
        query = request.query_params.get("query", "")
        page = request.query_params.get("page", 1)

        if not query:
            return Response(
                {"error": "Query parameter is required."},
                status=400,
            )

        movies = TMDBService().search_movies(query=query, page=page)
        return Response(movies)
    
class MovieTMDBDetailView(APIView):
    def get(self, request, tmdb_id):
        movie = TMDBService().get_movie_details(tmdb_id)
        return Response(movie)

class WatchlistView(generics.ListCreateAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WatchlistDetailView(generics.DestroyAPIView):
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Watchlist.objects.filter(user=self.request.user)

class FavoriteView(generics.ListCreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FavoriteDetailView(generics.DestroyAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

class ViewingHistoryView(generics.ListCreateAPIView):
    serializer_class = ViewingHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ViewingHistory.objects.filter(user=self.request.user).order_by("-watched_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
