from django.urls import path
from .views import (
    MovieListCreateView,
    MovieDetailView,
    PopularMoviesView,
    MovieSearchView,
    MovieTMDBDetailView,
    WatchlistView,
    WatchlistDetailView,
)
from .auth_views import CurrentUserView, RegisterView

urlpatterns = [
    path("", MovieListCreateView.as_view(), name="movie-list"),
    path("popular/", PopularMoviesView.as_view(), name="movie-popular"),
    path("search/", MovieSearchView.as_view(), name="movie-search"),
    path("<int:tmdb_id>/", MovieDetailView.as_view(), name="movie-detail"),
    path("tmdb/<int:tmdb_id>/", MovieTMDBDetailView.as_view(), name="movie-tmdb-detail"),
    path("auth/me/", CurrentUserView.as_view(), name="current-user"),
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("watchlist/", WatchlistView.as_view(), name="watchlist"),
    path("watchlist/<int:pk>/", WatchlistDetailView.as_view(), name="watchlist-detail"),
]
