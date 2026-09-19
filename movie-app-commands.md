# Movie App — Commands and Installations

## Project directory

```bash
mkdir -p ~/Documents/Study/tsi/IV/web/movie-app
cd ~/Documents/Study/tsi/IV/web/movie-app
```

## Python virtual environment

```bash
python3.12 -m venv .venv
source .venv/bin/activate
```

For every new terminal session:

```bash
cd ~/Documents/Study/tsi/IV/web/movie-app
source .venv/bin/activate
```

Verify Python:

```bash
python --version
```

## Install packages

```bash
python -m pip install Django==6.1.1
python -m pip install djangorestframework
python -m pip install python-dotenv requests
```

Save installed packages:

```bash
python -m pip freeze > requirements.txt
```

Install later from the file:

```bash
python -m pip install -r requirements.txt
```

## Create the Django project

Run from inside `movie-app/`:

```bash
django-admin startproject backend .
```

## Create the movies app

```bash
python manage.py startapp movies
```

Add these entries to `INSTALLED_APPS` in `backend/settings.py`:

```python
"rest_framework",
"movies",
```

## Environment variables

Create `.env` in the project root:

```env
TMDB_API_TOKEN=YOUR_TMDB_READ_ACCESS_TOKEN
```

Do not commit `.env`.

In `backend/settings.py`:

```python
import os
from dotenv import load_dotenv

load_dotenv()

TMDB_API_TOKEN = os.getenv("TMDB_API_TOKEN")
```

## Database and migrations

After changing `movies/models.py`:

```bash
python manage.py makemigrations movies
python manage.py migrate
```

Check migration status:

```bash
python manage.py showmigrations movies
```

## Create the admin user

```bash
python manage.py createsuperuser
```

## Run checks

```bash
python manage.py check
```

## Run the development server

```bash
python manage.py runserver
```

Stop the server:

```text
Ctrl+C
```

## Git ignore

`.gitignore` should contain:

```text
.env
.venv/
```

Useful Git commands:

```bash
git add .
git status
```

Check that `.env` is not staged.

## Current endpoints

```text
GET http://127.0.0.1:8000/api/movies/
GET http://127.0.0.1:8000/api/movies/500/
GET http://127.0.0.1:8000/api/movies/popular/
GET http://127.0.0.1:8000/api/movies/popular/?page=2
GET http://127.0.0.1:8000/api/movies/search/?query=batman
```

Admin:

```text
http://127.0.0.1:8000/admin/
```

## Useful Django commands

```bash
python manage.py help
python manage.py shell
python -m pip list
```

## Typical development workflow

```bash
cd ~/Documents/Study/tsi/IV/web/movie-app
source .venv/bin/activate
python manage.py check
python manage.py runserver
```

After model changes:

```bash
python manage.py makemigrations
python manage.py migrate
```
