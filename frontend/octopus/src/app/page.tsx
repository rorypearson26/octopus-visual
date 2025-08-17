"use client";

import { useMemo } from "react";

import {
  Box,
  Button,
  Center,
  Container,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";

import { useBackendAwake } from "./api/wakeup/route";
import Header from "./common/header/Header";
import StatusWithText from "./common/header/StatusWithText";

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

  const isContinueEnabled = useMemo(() => {
    return isDirty() && isValid() && isBackendAwake;
  }, [isDirty, isValid, isBackendAwake]);

  const onFormSubmit = () => {
    console.log("off to see the api");
  };

  return (
    <form onSubmit={form.onSubmit(onFormSubmit)}>
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
            isEnabled={false}
            enabledText="API key is good to go"
            loadingText="Submit API key to continue"
          />
          <Stack align="center">
            <TextInput
              {...form.getInputProps("apiKey")}
              mt="md"
              placeholder="API Key"
            />
            <Button type="submit" mt="md">
              Check API Key
            </Button>
            <Center mt={10}>
              <Button disabled={!isContinueEnabled}>Continue</Button>
            </Center>
          </Stack>
        </Container>
      </Box>
    </form>
  );
}
