"use client";

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

import StatusWithText from '@/_common/status/StatusWithText';
import { Box, Button, Center, Container, Group, Stack, Text, TextInput } from '@mantine/core';
import { hasLength, matches, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import useAuthenticated from './useAthenticate';
import { useBackendAwake } from './useBackendAlive';

const API_KEY_MIN_LENGTH = 10;
const API_KEY_MAX_LENGTH = 50;

export default function LandingPage() {
  const isBackendAwake = useBackendAwake();

  const { mutate, isAuthenticated, errors, clearAuthentication } =
    useAuthenticated();

  const router = useRouter();

  const form = useForm({
    validateInputOnChange: true,
    onValuesChange: (values) => {
      form.setFieldValue("accountNumber", values.accountNumber.toUpperCase());
    },
    mode: "controlled",
    initialValues: { apiKey: "", accountNumber: "" },
    validate: {
      apiKey: hasLength(
        { min: API_KEY_MIN_LENGTH, max: API_KEY_MAX_LENGTH },
        `Must be between ${API_KEY_MIN_LENGTH} and ${API_KEY_MAX_LENGTH} characters`
      ),
      accountNumber: matches(
        /^[A-Z0-9]{8}$/i,
        "Number should consist of 8 alphanumeric characters"
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
    if (errors?.length !== 0 && errors !== null) {
      for (const error of errors) {
        notifications.show({
          title: "Authentication Error",
          message: error,
          color: "red",
        });
      }
    }
  }, [errors]);

  const isContinueEnabled = useMemo(() => {
    return isBackendAwake && isAuthenticated;
  }, [isBackendAwake, isAuthenticated]);

  const handleContinue = useCallback(() => {
    router.push("/account");
  }, [router]);

  const handleClearAuthentication = useCallback(() => {
    clearAuthentication();
    form.reset();
  }, [form, clearAuthentication]);

  const onFormSubmit = () => {
    clearAuthentication();
    mutate({
      apiKey: cleanInput(form.values.apiKey),
      accountNumber: cleanInput(form.values.accountNumber),
    });
  };

  const cleanInput = (formInput: string) => {
    if (typeof formInput !== "string") return "";
    return formInput.replace(/\s/g, "").trim();
  };

  return (
    <form
      onSubmit={form.onSubmit(onFormSubmit)}
      onReset={handleClearAuthentication}
    >
      <Box>
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
              label="API Key"
              mt="md"
              placeholder="API Key"
              withAsterisk
              value={process.env.NEXT_PUBLIC_API_KEY || ""}
            />
            <TextInput
              {...form.getInputProps("accountNumber")}
              mt="md"
              label={"Account Number" + process.env.NEXT_PUBLIC_ACCOUNT_NUMBER}
              leftSection="A-"
              placeholder="Account Number"
              withAsterisk
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
