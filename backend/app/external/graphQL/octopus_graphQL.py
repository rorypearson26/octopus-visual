import abc
import json
import logging
from typing import Mapping

import requests
from pydantic import BaseModel


class OctopusGraphQL(abc.ABC):
    def __init__(self, query: str, token: str):
        self.query = query
        self.token = token
        self.data = None

    OCTOPUS_API_URL = "https://api.octopus.energy/v1/graphql/"

    logger = logging.getLogger(__name__)

    @abc.abstractmethod
    def process_data(self) -> BaseModel:
        """
        All concrete child classes must implement this method.
        """
        pass

    def _run_query(self, variables: Mapping):
        payload = {
            "query": self.query,
            "variables": variables
        }

        request = requests.post(self.OCTOPUS_API_URL, data=json.dumps(payload), headers=self._build_headers())
        if request.status_code == 200:
            self.data = request.json()["data"]
        else:
            raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, self.query))

    def _build_headers(self) -> Mapping:
        return {
            "Content-Type": "application/json",
            "Authorization": self.token
        }
