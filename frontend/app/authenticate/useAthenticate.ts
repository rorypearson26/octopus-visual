"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const OCTOPUS_API = "https://api.octopus.energy/v1/graphql/";
const JWT_EXPIRATION_IN_MINUTES = 30;

interface MutationArgs {
  apiKey: string;
  accountNumber: string;
}

interface PossibleErrorType {
  code: string;
  description: string;
  message: string;
  type: string;
}

export interface ObtainKrakenToken {
  possibleErrors: PossibleErrorType[];
  token: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
  refreshToken: string;
  refreshExpiresIn: number;
}

export interface ObtainKrakenTokenResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
  data: {
    obtainKrakenToken: ObtainKrakenToken | null;
  };
  accountNumber: string;
}

export interface AccountResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
  data: {
    account: {
      id: string;
    };
  };
}

export default function useAuthenticated() {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [isTokenCached, setIsTokenCached] = useState(false);
  const [isValidAccountNumber, setIsValidAccountNumber] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsAuthenticated(isTokenCached && isValidAccountNumber);
  }, [isTokenCached, isValidAccountNumber]);

  function updateErrors(newErrors: string[]) {
    setErrors((prevErrors) => [...(prevErrors ?? []), ...newErrors]);
  }

  function getJwtExpiration(): number {
    const oneMinuteInDays = 1 / (60 * 24);
    return oneMinuteInDays * JWT_EXPIRATION_IN_MINUTES;
  }

  function fetchToken(
    apiKey: string,
    accountNumber: string
  ): Promise<ObtainKrakenTokenResponse> {
    return fetch(OCTOPUS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation ObtainKrakenToken($input: ObtainJSONWebTokenInput!) {
            obtainKrakenToken(input: $input) {
              token
              payload
              refreshToken
              refreshExpiresIn
            }
          }
        `,
        variables: {
          input: { APIKey: apiKey },
        },
      }),
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return { ...data, accountNumber: accountNumber };
    }) as Promise<ObtainKrakenTokenResponse>;
  }

  async function fetchAccountId(
    accountNumber: string,
    jwtToken: string
  ): Promise<boolean> {
    const response = await fetch(OCTOPUS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${jwtToken}`,
      },
      body: JSON.stringify({
        query: `
          query Account($accountNumber: String!) {
            account(accountNumber: $accountNumber) {
              id
            }
          }
        `,
        variables: {
          accountNumber: `A-${accountNumber}`,
        },
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data?.data?.account?.id) {
      return true;
    } else {
      updateErrors(["Account number is not valid"]);
      clearAuthentication();
      return false;
    }
  }

  async function handleAuthentication(response: ObtainKrakenTokenResponse) {
    if (!response.data.obtainKrakenToken) {
      clearAuthentication();
    } else {
      setIsTokenCached(true);
      try {
        setIsValidAccountNumber(
          await queryClient.fetchQuery({
            queryKey: ["accountValidation", response.accountNumber],
            queryFn: () =>
              fetchAccountId(
                response.accountNumber,
                response.data.obtainKrakenToken!.token
              ),
          })
        );
        const cookieExpiry = getJwtExpiration();
        Cookies.set("authToken", response.data.obtainKrakenToken.token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: cookieExpiry,
        });
        Cookies.set("accountNumber", `A-${response.accountNumber}`, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: cookieExpiry,
        });
      } catch (error) {
        updateErrors([`Error validating account number: ${error}`]);
      }
    }
  }

  function clearAuthentication() {
    Cookies.remove("authToken");
    setIsTokenCached(false);
    setIsValidAccountNumber(false);
  }

  const { mutate } = useMutation({
    mutationKey: ["authenticate"],
    mutationFn: async ({ apiKey, accountNumber }: MutationArgs) => {
      setErrors([]);
      return await fetchToken(apiKey, accountNumber);
    },
    retry: false,
    onError: (error) => {
      updateErrors([
        `Failed to authenticate. Issues is likely an Octopus API problem. Error: ${error}`,
      ]);
      clearAuthentication();
    },
    onSuccess: (responseData: ObtainKrakenTokenResponse) => {
      if (responseData.errors) {
        updateErrors(["Check your API key and try again."]);
        clearAuthentication();
      } else {
        handleAuthentication(responseData);
      }
    },
  });

  return {
    mutate,
    isAuthenticated,
    errors,
    clearAuthentication,
  };
}
