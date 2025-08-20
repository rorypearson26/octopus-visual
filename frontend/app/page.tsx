"use client";

import { useMemo } from 'react';

import { Box, Button, Center, Container, Group, Stack, Text, Textarea } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';

import { clearAuthentication, isAuthenticated } from './api/api';
import { useAuthenticate } from './api/authenticate/route';
import { useBackendAwake } from './api/wakeup/route';
import Header from './common/header/Header';
import StatusWithText from './common/header/StatusWithText';

const API_KEY_LENGTH = 10;

export default function LandingPage() {
  const isBackendAwake = useBackendAwake();

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

  const { isValid, isDirty } = form;
  const { isSuccess, mutate } = useAuthenticate();

  const isContinueEnabled = useMemo(() => {
    return isDirty() && isValid() && isBackendAwake && isSuccess;
  }, [isDirty, isValid, isBackendAwake, isSuccess]);

  const onFormSubmit = () => {
    mutate(form.values.apiKey);
  };

  return (
    <form onSubmit={form.onSubmit(onFormSubmit)}>
      <Box>
        <Header />
        <Container size="sm" mt={20}>
          <Text m={2}>Submit API key to authenticate account</Text>
          <StatusWithText
            isEnabled={true} // change to isBackendAwake
            enabledText="Backend is alive"
            loadingText="Waiting for backend to wake up"
          />
          <StatusWithText
            isEnabled={isAuthenticated()}
            enabledText="API key is good to go"
            loadingText="Submit API key to continue"
          />
          <Stack align="stretch">
            <Textarea
              {...form.getInputProps("apiKey")}
              mt="md"
              placeholder="API Key"
            />
            <Button type="submit" mt="md">
              Get Kraken Token
            </Button>
            <Center mt={10}>
              <Group>
                <Button disabled={!isContinueEnabled}>Continue</Button>
                <Button
                  onClick={() => {
                    clearAuthentication();
                  }}
                >
                  Clear Auth
                </Button>
              </Group>
            </Center>
          </Stack>
        </Container>
      </Box>
    </form>
  );
}
