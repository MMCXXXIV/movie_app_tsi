
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient

from .models import Movie, Watchlist, Favorite


class RegistrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = "/api/movies/auth/register/"

    def test_register_user(self):
        response = self.client.post(
            self.url,
            {
                "username": "newuser",
                "email": "newuser@example.com",
                "password": "StrongPass123!",
                "password2": "StrongPass123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(username="newuser").exists())

    def test_duplicate_username_is_rejected(self):
        User.objects.create_user(
            username="existing",
            password="StrongPass123!",
        )

        response = self.client.post(
            self.url,
            {
                "username": "existing",
                "email": "another@example.com",
                "password": "StrongPass123!",
                "password2": "StrongPass123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 400)


class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username="testuser",
            password="StrongPass123!",
        )

    def test_login_returns_tokens(self):
        response = self.client.post(
            "/api/auth/token/",
            {
                "username": "testuser",
                "password": "StrongPass123!",
            },
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_current_user_requires_authentication(self):
        response = self.client.get("/api/movies/auth/me/")

        self.assertEqual(response.status_code, 401)


class UserDataIsolationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user1 = User.objects.create_user(
            username="user1",
            password="StrongPass123!",
        )
        self.user2 = User.objects.create_user(
            username="user2",
            password="StrongPass123!",
        )
        self.movie = Movie.objects.create(
            tmdb_id=550,
            title="Test Movie",
        )
        Watchlist.objects.create(user=self.user1, movie=self.movie)
        Favorite.objects.create(user=self.user1, movie=self.movie)

    def test_watchlist_is_private(self):
        self.client.force_authenticate(user=self.user2)

        response = self.client.get("/api/movies/watchlist/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)

    def test_favorites_are_private(self):
        self.client.force_authenticate(user=self.user2)

        response = self.client.get("/api/movies/favorites/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 0)


class MovieEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_popular_movies_endpoint_responds(self):
        response = self.client.get("/api/movies/popular/")

        # The endpoint may fail if TMDB is unavailable or its credentials
        # are invalid, so this test verifies the normal successful response.
        if response.status_code == 200:
            self.assertIn("results", response.data)
        else:
            self.fail(
                f"Popular movies endpoint returned {response.status_code}"
            )
