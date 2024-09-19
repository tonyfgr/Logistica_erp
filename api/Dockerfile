FROM python:3.10.15-alpine3.19

ENV PYTHONUNBUFFERED 1

WORKDIR /api

COPY . .

RUN pip install --upgrade pip && \
    apk add --no-cache gcc musl-dev mariadb-connector-c-dev && \
    pip install --no-cache-dir -r requirements.txt

RUN python manage.py migrate

ENTRYPOINT [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]
