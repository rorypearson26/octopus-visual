from typing import Mapping

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.external.graphQL.meters import Meters
from app.middleware.dependencies import get_token_header


class AccountRequest(BaseModel):
    account_number: str


router = APIRouter(prefix="/api")


@router.post("/meters")
async def get_meters(
        account_details: AccountRequest,
        validated_token: str = Depends(get_token_header)
) -> Mapping:
    meters = Meters(validated_token, account_details.account_number)
    return meters.process_data().model_dump()
