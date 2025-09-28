import json
import logging
from typing import Mapping, List

import requests
from pydantic import BaseModel

from app.external.graphQL.octopus_graphQL import OctopusGraphQL


class MetersResponse(BaseModel):
    gas_meter_ids: List[str]
    electricity_meter_ids: List[str]

class Meters(OctopusGraphQL):
    def __init__(self, token: str, accountNumber: str):
        self.data = None
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
        super().__init__(query, token)
        self.account_number = accountNumber


    def process_data(self) -> MetersResponse:
        self.data = self._run_query({"accountNumber": self.account_number})
        return self._process_meters()

    def _get_list_of_meter_ids(self, agreement_type: str) -> List[str]:
        return [meter["id"] for meter in self.data["account"][agreement_type][0]["meterPoint"]["meters"]]

    def _process_meters(self) -> MetersResponse:
        try:
            return MetersResponse(
            gas_meter_ids= self._get_list_of_meter_ids("gasAgreements"),
            electricity_meter_ids= self._get_list_of_meter_ids("electricityAgreements")
        )
        except IndexError or KeyError:
            self.logger.error("Could not deserialise meter reponse coming from octopus API")
            raise





