import logging
from http import HTTPStatus

from fastapi import APIRouter
from fastapi.openapi.models import Response
from starlette import status

router = APIRouter(prefix="/api")
logger = logging.getLogger(__name__)


@router.head("/healthcheck", tags=["setup"])
async def healthcheck():
    logger.info("Returning 200 from healthcheck.")
    return Response(status_code=status.HTTP_200_OK)
