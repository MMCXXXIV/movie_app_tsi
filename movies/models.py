# Create your models here.
from django.db import models

class Movie(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    overview = models.TextField(blank=True)
    release_date = models.DateField(null=True, blank=True)
    poster_path = models.CharField(max_length=255, blank=True)
    backdrop_path = models.CharField(max_length=255, blank=True)
    rating = models.FloatField(default=0)
    vote_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title
