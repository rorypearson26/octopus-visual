from fastapi import APIRouter, Depends

from middleware.dependencies import get_token_header
from external.octopus_api import get_meters_from_octopus
from pydantic import BaseModel

router = APIRouter(prefix="/api")

class Meters(BaseModel):
    gas_meter_id: str | None
    electricity_meter_id: str | None

@router.get("/meters/{account_number}")
async def get_meters(
    account_number: str,
    validated_token: str = Depends(get_token_header)
) -> Meters:
    get_meters_from_octopus(account_number, validated_token)
    return Meters(**get_meters_from_octopus(account_number, validated_token))