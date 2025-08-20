"use client";
import axios from 'axios';

import { useMutation } from '@tanstack/react-query';

import { handleAuthentication } from '../api';

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
  data?: {
    data?: {
      obtainKrakenToken: ObtainKrakenToken;
    };
  };
}

function fetchToken(apiKey: string): Promise<ObtainKrakenTokenResponse> {
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
  const { isSuccess, mutate } = useMutation({
    mutationKey: ["authenticate"],
    mutationFn: async (apiKey: string) => {
      return await fetchToken(apiKey);
    },
    retry: false,
    onError: (error) => {
      console.error("An error occurred:", error);
      alert("Failed to create post. Please try again.");
    },
    onSuccess: (data) => {
      const tokenData = data.data?.data?.obtainKrakenToken;

      if (tokenData && tokenData.token) {
        console.log("Post created successfully:", data);
        alert(`Post created successfully!: ${tokenData.token}`);
        handleAuthentication(tokenData.token);
      } else {
        console.error("Received unexpected data format:", data);
        alert("Failed to get token. Please try again.");
      }
    },
  });

  return {
    mutate,
    isSuccess,
  };
}
