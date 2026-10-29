import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI is missing from the .env file")

client = MongoClient(
    MONGODB_URI,
    serverSelectionTimeoutMS=5000,
)

db = client["reeltime"]
movie_cache = db["movie_cache"]

# A TMDB movie should have only one cached document.
movie_cache.create_index("tmdb_id", unique=True)


def check_connection():
    client.admin.command("ping")
    return True


def get_cached_movie(tmdb_id: int):
    return movie_cache.find_one({"tmdb_id": tmdb_id}, {"_id": 0})


def cache_movie(movie: dict):
    document = {
        **movie,
        "tmdb_id": movie["id"],
        "cached_at": datetime.now(timezone.utc),
    }

    movie_cache.update_one(
        {"tmdb_id": document["tmdb_id"]},
        {"$set": document},
        upsert=True,
    )

    return get_cached_movie(document["tmdb_id"])
