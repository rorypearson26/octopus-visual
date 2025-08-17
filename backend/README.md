# Octopus Visual Backend
FastAPI running on gunicorn to handle calls from front-end.

## Endpoints:
* /wakeup
  * Utility to awaken backend as anticipate being cheap and running on auto-shutdown Heroku.

## Running:
There are two options for running the backend, either via docker or CLI
### Docker:
Build the docker image from root of this folder
```bash
docker build -t octopus-backend .
```
Run the latest image
```bash 
docker run -p 8000:8000 octopus-backend:latest
```
### CLI
Running from the `app` directory
```bash 
uvicorn main:app --reload
```
_Note the `--reload` flag will reload the server if any changes are detected. As such, probably easiest to use this during development._