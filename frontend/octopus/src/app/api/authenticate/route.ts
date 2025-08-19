"use client";
import axios from 'axios';

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
  payload: any;
  refreshToken: string;
  refreshExpiresIn: number;
}

export interface ObtainKrakenTokenResponse {
  data: {
    data: {
      obtainKrakenToken: ObtainKrakenToken;
    };
  };
}

function fetchToken(apiKey: string): Promise<ObtainKrakenTokenResponse> {
  console.log("fetchToken called with API key:", apiKey);
  return octopusApi.post("", {
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
  });
}

export function useAuthenticate() {
  const { isSuccess, data, mutate } = useMutation({
    mutationKey: ["authenticate"],
    mutationFn: async (apiKey: string) => {
      return await fetchToken(apiKey);
    },
    retry: false,
    onError: (error) => {
      // `error` is the error object
      console.error("An error occurred:", error);
      // Show a user-facing error message
      alert("Failed to create post. Please try again.");
    },
    onSuccess: (data) => {
      const {
        data: { obtainKrakenToken },
      } = data.data;
      console.log("Post created successfully:", data);
      // Optionally, show a success message or redirect
      alert(`Post created successfully!: ${obtainKrakenToken.token}`);
    },
  });

  return {
    mutate,
    isSuccess,
  };
}
