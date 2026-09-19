from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Movie
from .serializers import MovieSerializer
from .services.tmdb import TMDBService


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
