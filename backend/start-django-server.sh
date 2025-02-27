#!/bin/bash

echo "Applying db migrations"
python manage.py migrate --noinput

echo "Collect static files"
python manage.py collectstatic --noinput

echo "Start production server"
exec gunicorn --bind 0.0.0.0:8000 --workers 3 SystemZapisowAPI.wsgi:application --timeout 600