# octopus-visual
Playing with Octopus Energy API to see what usual visuals we can create.

## Running
The frontend and backend have both been dockerised to simplify running of the application. There are three different profiles that can be used depending on your use-case:
### full
Runs both frontend (on port 3000) and backend (on port 8000)
```bash
docker compose --profile full up -d
```
### backend
Runs only the backend of the application on a gunicorn server
```bash
docker compose --profile backend up -d
```
### frontend
Runs only the frontend of the application
```bash
docker compose --profile frontend up -d
```