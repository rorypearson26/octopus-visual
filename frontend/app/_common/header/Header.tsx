"use client";
import { CiLight } from "react-icons/ci";
import { IoIosMoon } from "react-icons/io";

import {
  ActionIcon,
  Box,
  Container,
  Title,
  useMantineColorScheme,
} from "@mantine/core";

export default function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Box
      component="header"
      p="md"
      style={{
        borderBottom: "1px solid var(--mantine-color-gray-2)",
        backgroundColor: "var(--mantine-color-body)",
      }}
    >
      <Container
        size="sm"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title
          order={4}
          style={{ textTransform: "uppercase", letterSpacing: "1px" }}
        >
          Octopus Visuals
        </Title>
        <ActionIcon
          onClick={toggleColorScheme}
          size="lg"
          variant="default"
          aria-label="Toggle color scheme"
        >
          {colorScheme === "dark" ? (
            <CiLight style={{ width: 22, height: 22 }} />
          ) : (
            <IoIosMoon style={{ width: 22, height: 22 }} />
          )}
        </ActionIcon>
      </Container>
    </Box>
  );
}
