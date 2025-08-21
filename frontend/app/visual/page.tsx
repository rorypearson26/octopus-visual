"use client";

import { Container, Title, useMantineColorScheme } from '@mantine/core';

export default function Home() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Container>
      <Title>Here we are then</Title>
    </Container>
  );
}
