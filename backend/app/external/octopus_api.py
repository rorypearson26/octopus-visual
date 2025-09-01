import json
import logging
from typing import Mapping, List

import requests
from pydantic import BaseModel


class Meters(BaseModel):
    gas_meter_id: List[str]
    electricity_meter_id: List[str]

OCTOPUS_API_URL = "https://api.octopus.energy/v1/graphql/"

logger = logging.getLogger(__name__)


def get_meters_from_octopus(account_number: str, token: str) -> Meters:
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
    return _process_meters(data)


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

def _get_list_of_meter_ids(data: Mapping, agreement_type: str) -> List[str]:
    return [meter["id"] for meter in data["account"][agreement_type][0]["meterPoint"]["meters"]]

def _process_meters(data: Mapping) -> Meters:
    try:
        return Meters(
        gas_meter_id= _get_list_of_meter_ids(data, "gasAgreements" ),
        electricity_meter_id= _get_list_of_meter_ids(data, "electricityAgreements" )
    )
    except IndexError or KeyError:
        logger.error("Could not deserialise meter reponse coming from octopus API")
        raise





