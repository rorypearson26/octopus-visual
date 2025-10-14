import logging
from http import HTTPStatus

from fastapi import APIRouter

router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)


@router.get("/wakeup", tags=["setup"])
async def wakeup():
    logger.info("Waking up backend application")
    return HTTPStatus.OK
