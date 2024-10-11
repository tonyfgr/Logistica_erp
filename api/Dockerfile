FROM python:3.10.15-alpine3.19

ENV PYTHONUNBUFFERED=1

WORKDIR /api

COPY . .

RUN pip install --upgrade pip && \
    apk add --no-cache gcc musl-dev mariadb-connector-c-dev && \
    pip install --no-cache-dir -r requirements.txt

RUN python manage.py migrate

RUN python manage.py collectstatic

ENTRYPOINT [ "gunicorn", "--workers", "3", "--bind", "0.0.0.0:8000", "erp.wsgi" ]
