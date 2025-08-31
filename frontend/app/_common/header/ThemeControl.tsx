"use client";

import React, { useEffect, useState } from 'react';
import { CiLight } from 'react-icons/ci';
import { IoIosMoon } from 'react-icons/io';

import { ActionIcon, useMantineColorScheme } from '@mantine/core';

const ThemeControl: React.FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedColorScheme = localStorage.getItem("colorScheme") as
      | "dark"
      | "light"
      | null;
    if (storedColorScheme && storedColorScheme !== colorScheme) {
      setColorScheme(storedColorScheme);
    }
    setInitialized(true);
  }, [setColorScheme, colorScheme]);

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(newColorScheme);
    localStorage.setItem("colorScheme", newColorScheme);
  };

  return (
    <ActionIcon
      onClick={toggleColorScheme}
      size="lg"
      variant="default"
      aria-label="Toggle color scheme"
    >
      {initialized &&
        (colorScheme === "dark" ? (
          <IoIosMoon style={{ width: 22, height: 22 }} />
        ) : (
          <CiLight style={{ width: 22, height: 22 }} />
        ))}
    </ActionIcon>
  );
};

export default ThemeControl;
