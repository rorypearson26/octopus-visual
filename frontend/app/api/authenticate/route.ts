"use client";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';

export const octopusApi = axios.create({
  baseURL: "https://api.octopus.energy/v1/graphql/",
});

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
}

export function useAuthenticated() {
  const [errors, setErrors] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function fetchToken(apiKey: string): Promise<ObtainKrakenTokenResponse> {
    return octopusApi
      .post("", {
        headers: {
          "Content-Type": "application/json",
        },
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
      })
      .then((response) => response.data) as Promise<ObtainKrakenTokenResponse>;
  }

  function handleAuthentication(token: ObtainKrakenToken) {
    if (!token) {
      clearAuthentication();
    } else {
      Cookies.set("authToken", token.token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      setIsAuthenticated(true);
    }
  }

  function clearAuthentication() {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
  }

  const { mutate } = useMutation({
    mutationKey: ["authenticate"],
    mutationFn: async (apiKey: string) => {
      setErrors(null);
      return await fetchToken(apiKey);
    },
    retry: false,
    onError: (error) => {
      setErrors(
        `Failed to authenticate. Issues is likely an Octopus API problem. Error: ${error}`
      );
      clearAuthentication();
    },
    onSuccess: (responseData: ObtainKrakenTokenResponse) => {
      if (responseData.errors) {
        setErrors("Check your API key and try again.");
        clearAuthentication();
      } else {
        handleAuthentication(responseData.data.obtainKrakenToken!);
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
