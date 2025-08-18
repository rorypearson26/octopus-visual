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
  });
  console.log(data);
  console.log(isSuccess);
  console.log(!isSuccess || !data);
  if (!isSuccess || !data) {
    console.log(data);
    console.log(isSuccess);
    return {
      mutate,
      isSuccess,
      token: "",
      refreshToken: "",
      refreshExpiresIn: 0,
      possibleErrors: [],
    };
  }
  const {
    data: { obtainKrakenToken },
  } = data.data;
  return {
    mutate,
    isSuccess,
    token: obtainKrakenToken.token,
    refreshToken: obtainKrakenToken.refreshToken,
    refreshExpiresIn: obtainKrakenToken.refreshExpiresIn,
    possibleErrors: obtainKrakenToken.possibleErrors,
  };
}
