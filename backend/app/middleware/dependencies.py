from typing import Annotated

from fastapi import Header, HTTPException


async def get_token_header(token: Annotated[str, Header()]):
    if not token:
        raise HTTPException(status_code=403, detail="Token required for this endpoint.")
    return token