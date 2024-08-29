FROM python:3.8
ENV PYTHONUNBUFFERED 1
WORKDIR /api
COPY requirements.txt /api/requirements.txt
RUN pip3 install -r requirements.txt
COPY . /api