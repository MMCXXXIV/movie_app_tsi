from django.urls import path
from .views import MovieListCreateView, MovieDetailView, PopularMoviesView, MovieSearchView, MovieTMDBDetailView

urlpatterns = [
    path("", MovieListCreateView.as_view(), name="movie-list"),
    path("popular/", PopularMoviesView.as_view(), name="movie-popular"),
    path("search/", MovieSearchView.as_view(), name="movie-search"),
    path("<int:tmdb_id>/", MovieDetailView.as_view(), name="movie-detail"),
    path("tmdb/<int:tmdb_id>/", MovieTMDBDetailView.as_view(), name="movie-tmdb-detail"),
]
