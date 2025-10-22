import logging
from http import HTTPStatus

from fastapi import APIRouter

router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)


@router.head("/healthcheck", tags=["setup"])
async def healthcheck():
    logger.info("Returning 200 from healthcheck.")
    return HTTPStatus.OK