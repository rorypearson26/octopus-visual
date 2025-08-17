import asyncio
from http import HTTPStatus

from fastapi import APIRouter, FastAPI, BackgroundTasks

from fake_awake import Awake

awake = Awake()

app = FastAPI()
router = APIRouter()

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


async def sleep_app_in_n_seconds(seconds_delay: int):
    print(f"Staying fake awake for {seconds_delay} seconds...")
    await asyncio.sleep(seconds_delay)
    awake.is_awake = False
    print(f"Fake shutting down.")


async def wake_up(seconds_delay: int):
    print(f"Waking up in {seconds_delay} seconds...")
    await asyncio.sleep(seconds_delay)
    awake.is_awake = True
    print(f"I have risen")


@router.get("/", tags=["setup"])
async def wakeup(background_tasks: BackgroundTasks):
    background_tasks.add_task(wake_up, 7)
    if awake.is_awake:
        return HTTPStatus.OK
    else:
        background_tasks.add_task(sleep_app_in_n_seconds, 30)
        return HTTPStatus.NOT_FOUND



app.include_router(router)
