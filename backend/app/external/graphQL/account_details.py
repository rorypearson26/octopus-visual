import datetime
from typing import List

from pydantic import BaseModel, Field

from app.external.graphQL.octopus_graphQL import OctopusGraphQL


class Bill(BaseModel):
    fromDate: datetime.date
    toDate: datetime.date
    totalCharge: float
    billLink: str


class AccountDetailsResponse(BaseModel):
    name: str
    address: str
    balance: str
    bills: List[Bill]


class TotalCharges(BaseModel):
    grossTotal: float


class Node(BaseModel):
    temporaryUrl: str = Field(alias="temporaryUrl")
    toDate: datetime.date
    fromDate: datetime.date
    totalCharges: TotalCharges

    @property
    def to_bill(self) -> Bill:
        return Bill(
            fromDate=self.fromDate,
            toDate=self.toDate,
            totalCharge=self.totalCharges.grossTotal / 100,
            billLink=self.temporaryUrl
        )


class Edge(BaseModel):
    node: Node


class BillsResponse(BaseModel):
    edges: List[Edge]


class AccountDetails(OctopusGraphQL):
    def __init__(self, token: str, account_number: str, number_of_bills: int):
        self.data = None
        query = """
                query GetAccountDetails($accountNumber: String!, $numberOfBills: Int!) {
                  account(accountNumber: $accountNumber) {
                    address {
                      streetAddress
                      postalCode
                      country
                    }
                    balance(includeAllLedgers: true)
                    billingName
                    bills(first: $numberOfBills) {
                      edges {
                        node {
                          ... on StatementType {
                            id
                            temporaryUrl
                            toDate
                            fromDate
                            totalCharges {
                              grossTotal
                            }
                          }
                        }
                      }
                    }
                  }
                }
            """
        super().__init__(query, token)
        self.account_number = account_number
        self.number_of_bills = number_of_bills

    def process_data(self) -> AccountDetailsResponse:
        self._run_query({"accountNumber": self.account_number, "numberOfBills": self.number_of_bills})

        return AccountDetailsResponse(
            name=self.data["account"]["billingName"],
            balance=self._get_pence_as_pount_string(),
            address=self._get_address_as_string(),
            bills=self._get_list_of_bills()
        )

    def _get_list_of_bills(self) -> List[Bill]:
        bills_data = self.data["account"]["bills"]
        parsed_response = BillsResponse.model_validate(bills_data)

        return [edge.node.to_bill for edge in parsed_response.edges]

    def _get_address_as_string(self) -> str:
        address = self.data["account"]["address"]
        street = address["streetAddress"].replace('\n', ', ').title()
        postal_code = address["postalCode"]
        country = address["country"]

        return f"{street}, {postal_code}, {country}"

    def _get_pence_as_pount_string(self) -> str:
        balance: int = self.data["account"]["balance"]
        balance_in_pounds = balance / 100.0

        return f"£{balance_in_pounds:.2f}"
