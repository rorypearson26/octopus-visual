import json
import logging
from typing import Mapping

import requests

OCTOPUS_API_URL = "https://api.octopus.energy/v1/graphql/"

logger = logging.getLogger(__name__)


def get_meters_from_octopus(account_number: str, token: str) -> Mapping:
    query = """
        query GetMeterId($accountNumber: String!) {
          account(accountNumber: $accountNumber) {
            electricityAgreements {
              meterPoint {
                meters {
                  id
                }
              }
            }
            gasAgreements {
              meterPoint {
                meters {
                  id
                }
              }
            }
          }
        }
    """
    data = _run_query(query, token, {"accountNumber": account_number})
    logging.info(data)
    gas_meter_id = data["account"]["gasAgreements"][0]["meterPoint"]["meters"][0]["id"]
    electric_meter_id = data["account"]["electricityAgreements"][0]["meterPoint"]["meters"][0]["id"]
    return {
        "gas_meter_id": gas_meter_id,
        "electricity_meter_id": electric_meter_id
    }


def _run_query(query: str, token: str, variables: Mapping) -> Mapping:
    payload = {
        "query": query,
        "variables": variables
    }

    request = requests.post(OCTOPUS_API_URL, data=json.dumps(payload), headers=_build_headers(token))
    if request.status_code == 200:
        return request.json()["data"]
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))


def _build_headers(token: str) -> Mapping:
    return {
        "Content-Type": "application/json",
        "Authorization": token
    }
