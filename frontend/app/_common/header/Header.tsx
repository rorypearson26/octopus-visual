"use client";
import { useMemo } from 'react';
import { IconType } from 'react-icons';

import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Links from './Links';
import SignOut from './SignOut';
import ThemeControl from './ThemeControl';

interface HeaderProps {
  links: { label: string; link: string; icon: IconType }[];
  hasSignOut: boolean;
  children: React.ReactNode;
}

const StyledGroup = ({ children }: { children: React.ReactNode }) => (
  <Group
    h="100%"
    px="md"
    style={{
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
    }}
  >
    {children}
  </Group>
);

const CustomTitle = () => (
  <Title
    style={{
      textTransform: "uppercase",
      letterSpacing: "1px",
    }}
  >
    Octopus Visuals
  </Title>
);

export default function Header({
  links,
  hasSignOut = true,
  children,
}: HeaderProps) {
  const [opened, { toggle }] = useDisclosure();
  const hasLinks = useMemo(() => links.length > 0, [links]);

  return hasLinks ? (
    <AppShell
      header={{ height: "80" }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <StyledGroup>
          <CustomTitle />
          <ThemeControl />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </StyledGroup>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Links links={links} />
        {hasSignOut && <SignOut />}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  ) : (
    <AppShell header={{ height: 80 }} padding="md">
      <AppShell.Header>
        <StyledGroup>
          <CustomTitle />
          <ThemeControl />
        </StyledGroup>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
