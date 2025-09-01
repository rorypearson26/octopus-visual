from typing import Mapping

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.external.octopus_api import get_meters_from_octopus
from app.middleware.dependencies import get_token_header


class AccountRequest(BaseModel):
    account_number: str


router = APIRouter(prefix="/api")


@router.post("/meters")
async def get_meters(
        account_details: AccountRequest,
        validated_token: str = Depends(get_token_header)
) -> Mapping:
    return get_meters_from_octopus(account_details.account_number, validated_token).model_dump()
