from http import HTTPStatus

from fastapi import APIRouter

router = APIRouter(prefix="/api")

@router.get("/wakeup/", tags=["setup"])
async def wakeup():
    return HTTPStatus.OK