from django.urls import path
from .views import (
    FavoriteView,
    FavoriteDetailView,
    MovieListCreateView,
    MovieDetailView,
    PopularMoviesView,
    MovieSearchView,
    MovieTMDBDetailView,
    WatchlistView,
    WatchlistDetailView,
    ViewingHistoryView,
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
    path("favorites/", FavoriteView.as_view(), name="favorite"),
    path("favorites/<int:pk>/", FavoriteDetailView.as_view(), name="favorite-detail"),
    path("history/", ViewingHistoryView.as_view(), name="viewing-history"),
]


# {"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5MDQ0MTIyNywiaWF0IjoxNzkwMzU0ODI3LCJqdGkiOiIwNjE1ZjkxM2MwYzc0YzBiOTA2ZmU5Y2Y3OTQzYjA1MyIsInVzZXJfaWQiOiIyIn0.I_rHKiGCXyShL_tS40drnQhANGiLz4y56qB4cVrv6xA",
# 
# "access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkwMzU1MTI3LCJpYXQiOjE3OTAzNTQ4MjcsImp0aSI6IjViYTc5ZTBmNWJhYTQwZGE5NzkxNDc2YzAyYjY1NjI5IiwidXNlcl9pZCI6IjIifQ.uNR-oFUru5M51o-PZs3S4xt82aKv4fv_lAX5y-2SktY"}

# curl -X POST http://127.0.0.1:8000/api/movies/watchlist/ \
# -H "Content-Type: application/json" \
# -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkwMzU0Njg2LCJpYXQiOjE3OTAzNTQzODYsImp0aSI6ImIyZjE1YWEzZjcyMjRhNzk4OGVlMTA2M2UxZTNkMzA1IiwidXNlcl9pZCI6IjIifQ.mTBNzWyMNRXr7aWNg0aEOt7CUfcftTqGMJ_gZHxEMW8" \
# -d '{"movie_id":550}'


# curl -X POST http://127.0.0.1:8000/api/movies/favorites/ \
# -H "Content-Type: application/json" \
# -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkwMzU1MTI3LCJpYXQiOjE3OTAzNTQ4MjcsImp0aSI6IjViYTc5ZTBmNWJhYTQwZGE5NzkxNDc2YzAyYjY1NjI5IiwidXNlcl9pZCI6IjIifQ.uNR-oFUru5M51o-PZs3S4xt82aKv4fv_lAX5y-2SktY" \
# -d '{"movie_id":550}'

# curl -X DELETE http://127.0.0.1:8000/api/movies/watchlist/3/ \
# -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzkwMzU1MTI3LCJpYXQiOjE3OTAzNTQ4MjcsImp0aSI6IjViYTc5ZTBmNWJhYTQwZGE5NzkxNDc2YzAyYjY1NjI5IiwidXNlcl9pZCI6IjIifQ.uNR-oFUru5M51o-PZs3S4xt82aKv4fv_lAX5y-2SktY"
