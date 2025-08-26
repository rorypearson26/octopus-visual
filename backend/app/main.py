from http import HTTPStatus

from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware

from fake_awake import Awake

awake = Awake()

app = FastAPI()
router = APIRouter(prefix="/api")

tags_metadata = [
    {
        "name": "setup",
        "description": "Waking up the backend and getting authenticated with the API key.",
    },
    {
        "name": "data",
        "description": "Fetching data from octopus, doing some processing and returning to client.",
    },
]

@router.get("/wakeup/", tags=["setup"])
async def wakeup():
    return HTTPStatus.OK

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
