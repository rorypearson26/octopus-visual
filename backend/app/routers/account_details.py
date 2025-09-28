from typing import Mapping

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.external.graphQL.account_details import AccountDetails
from app.external.graphQL.meters import Meters
from app.middleware.dependencies import get_token_header


class AccountRequest(BaseModel):
    account_number: str
    number_of_bills: int


router = APIRouter(prefix="/api")


@router.post("/account")
async def get_account_details(
        account_details: AccountRequest,
        validated_token: str = Depends(get_token_header)
) -> Mapping:
    account_details = AccountDetails(validated_token, account_details.account_number, account_details.number_of_bills)
    return account_details.process_data().model_dump()
