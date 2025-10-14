
FROM python:3.12

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip3 install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./app /code/app
EXPOSE 8000

CMD ["gunicorn", "--workers", "4", "--worker-connections", "1000", \
     "--bind", "0.0.0.0:8000", \
     "--worker-class", "uvicorn.workers.UvicornWorker", \
     "--env", "PYTHONUNBUFFERED=1", \
     "--forwarded-allow-ips", "127.0.0.1", \
     "app.main:app"]
