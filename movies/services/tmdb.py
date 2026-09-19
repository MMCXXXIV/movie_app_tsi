import requests
from django.conf import settings


class TMDBService:
    BASE_URL = "https://api.themoviedb.org/3"

    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {settings.TMDB_API_TOKEN}",
            "accept": "application/json",
        }

    def get_popular_movies(self, page=1):
        response = requests.get(
            f"{self.BASE_URL}/movie/popular",
            headers=self.headers,
            params={"language": "en-US", "page": page},
        )

        response.raise_for_status()
        return response.json()

    def search_movies(self, query, page=1):
        response = requests.get(
            f"{self.BASE_URL}/search/movie",
            headers=self.headers,
            params={
                "query": query,
                "language": "en-US",
                "page": page,
            },
        )

        response.raise_for_status()
        return response.json()

    def get_movie_details(self, tmdb_id):
        response = requests.get(
            f"{self.BASE_URL}/movie/{tmdb_id}",
            headers=self.headers,
            params={"language": "en-US"},
        )

        response.raise_for_status()
        return response.json()
