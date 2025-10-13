import logging

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routers import wakeup, meters, account_details

# Configure the basic logger to output INFO-level messages and higher
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

app = FastAPI()

tags_metadata = [
    {
        "name": "wakeup",
        "description": "Waking up the backend.",
    },
    {
        "name": "meters",
        "description": "Returns details of the meters linked to the account number.",
    },
    {
        "name": "data",
        "description": "Fetching data from octopus, doing some processing and returning to client.",
    },
]

origins = [
    "https://www.rorypearson.co.uk"
    "http://localhost:3000",
    "http://0.0.0.0:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(wakeup.router)
app.include_router(meters.router)
app.include_router(account_details.router)
