"use client";

import { Container, useMantineColorScheme } from "@mantine/core";

export default function Home() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return <Container>WHAT MATE</Container>;
}
