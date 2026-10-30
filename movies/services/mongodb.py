
import logging
import os
from datetime import datetime, timezone

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

logger = logging.getLogger(__name__)

MONGODB_URI = os.getenv("MONGODB_URI")

client = None
movie_cache = None

if MONGODB_URI:
    client = MongoClient(
        MONGODB_URI,
        serverSelectionTimeoutMS=3000,
    )
    db = client["reeltime"]
    movie_cache = db["movie_cache"]

    movie_cache.create_index(
        "cached_at",
        expireAfterSeconds=86400,
    )

def check_connection():
    if client is None:
        return False

    client.admin.command("ping")
    return True


def get_cached_movie(tmdb_id: int):
    if movie_cache is None:
        return None

    try:
        return movie_cache.find_one(
            {"tmdb_id": tmdb_id},
            {"_id": 0},
        )
    except PyMongoError:
        logger.warning("MongoDB cache read failed", exc_info=True)
        return None


def cache_movie(movie: dict):
    if movie_cache is None:
        return None

    document = {
        **movie,
        "tmdb_id": movie["id"],
        "cached_at": datetime.now(timezone.utc),
    }

    try:
        movie_cache.update_one(
            {"tmdb_id": document["tmdb_id"]},
            {"$set": document},
            upsert=True,
        )
        return get_cached_movie(document["tmdb_id"])
    except (PyMongoError, KeyError):
        logger.warning("MongoDB cache write failed", exc_info=True)
        return None
