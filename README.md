docker compose run --rm django sh -c "django-admin startproject juku ."

docker compose run --rm next sh -c "npx create-next-app ."

docker compose run --rm next sh -c "npm update"

docker compose up -d


docker compose run --rm django sh -c "django-admin startapp accounts" 

docker compose run --rm django sh -c "django-admin startapp lessons"
docker compose run --rm djangoga sh -c "python manage.py dumpdata --exclude admin --exclude auth.permission --exclude contenttypes > all.json"