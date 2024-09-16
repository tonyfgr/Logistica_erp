FROM python:3.8
ENV PYTHONUNBUFFERED 1
WORKDIR /api
COPY . .
RUN pip3 install -r requirements.txt

# MIGRAR LA BASE DE DATOS EN PRODUCCIÓN
RUN python manage.py migrate
