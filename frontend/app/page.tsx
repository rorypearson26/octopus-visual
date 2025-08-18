"use client";

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

import { Box, Button, Center, Container, Group, Stack, Text, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { useAuthenticated } from './api/authenticate/route';
import { useBackendAwake } from './api/wakeup/route';
import Header from './common/header/Header';
import StatusWithText from './common/header/StatusWithText';

const API_KEY_LENGTH = 10;

export default function LandingPage() {
  const isBackendAwake = useBackendAwake();
  const { mutate, isAuthenticated, errors, clearAuthentication } =
    useAuthenticated();
  const router = useRouter();

  const form = useForm({
    validateInputOnChange: true,
    mode: "uncontrolled",
    initialValues: { apiKey: "" },
    validate: {
      apiKey: hasLength(
        { min: API_KEY_LENGTH },
        `Must be at least ${API_KEY_LENGTH} characters`
      ),
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      notifications.show({
        title: "Authentication Successful",
        message: "You are now authenticated",
        color: "green",
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (errors) {
      notifications.show({
        title: "Authentication Error",
        message: errors,
        color: "red",
      });
    }
  }, [errors]);

  const isContinueEnabled = useMemo(() => {
    return isBackendAwake && isAuthenticated;
  }, [isBackendAwake, isAuthenticated]);

  const handleContinue = useCallback(() => {
    router.push("/visual");
  }, [router]);

  const handleClearAuthentication = useCallback(() => {
    clearAuthentication();
    form.reset();
  }, [form, clearAuthentication]);

  const onFormSubmit = () => {
    clearAuthentication();
    mutate(form.values.apiKey.trim());
  };

  return (
    <form
      onSubmit={form.onSubmit(onFormSubmit)}
      onReset={handleClearAuthentication}
    >
      <Box>
        <Header />
        <Container size="sm" mt={20}>
          <Text m={2}>Submit API key to authenticate account</Text>
          <StatusWithText
            isEnabled={isBackendAwake}
            enabledText="Backend is alive"
            loadingText="Waiting for backend to wake up"
          />
          <StatusWithText
            isEnabled={isAuthenticated}
            enabledText="API key is good to go"
            loadingText="Submit API key to continue"
          />
          <Stack align="stretch">
            <TextInput
              {...form.getInputProps("apiKey")}
              mt="md"
              placeholder="API Key"
            />
            <Button type="submit" mt="md">
              Get Kraken Token
            </Button>
            <Center mt={10}>
              <Group>
                <Button disabled={!isContinueEnabled} onClick={handleContinue}>
                  Continue
                </Button>
                <Button type="reset">Clear Auth</Button>
              </Group>
            </Center>
          </Stack>
        </Container>
      </Box>
    </form>
  );
}
