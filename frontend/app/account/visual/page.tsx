"use client";

import { Container, Title } from "@mantine/core";

import Meters from "./Meters";

export default function Home() {
  return (
    <Container>
      <Title>Welcome</Title>
      <Meters />
    </Container>
  );
}
