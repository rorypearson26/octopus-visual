"use client";

import BillCards from "@/_common/bill/BillCards";
import { Container, Text, Title } from "@mantine/core";

import BillChart from "./BillChart";
import { useAccountDetails } from "./useAccountDetails";

export default function AccountPage() {
  const { isSuccess, data, chartData } = useAccountDetails();
  console.log(chartData);
  if (isSuccess) {
    return (
      <Container>
        <Title>Welcome {data.name}</Title>
        <Text>Your address: {data.address}</Text>
        <Text>Your balance: {data.balance}</Text>
        <Text size="xl">Your Bills:</Text>
        <BillChart data={chartData} />
        <BillCards bills={data.bills} />
      </Container>
    );
  } else {
    return (
      <Container>
        <Title>Loading account details...</Title>
      </Container>
    );
  }
}
