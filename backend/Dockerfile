
FROM python:3.12

WORKDIR /app

COPY ./requirements.txt /code/requirements.txt

RUN pip3 install --upgrade pip
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY app /app
EXPOSE 8000
CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:8000", "--worker-class", "uvicorn.workers.UvicornWorker" ]
