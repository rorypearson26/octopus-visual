import { useQuery } from '@tanstack/react-query';

import api from '../api';

async function fetchWakeup() {
  return api.get("/wakeup");
}

export function useBackendAwake() {
  const { data } = useQuery({
    queryKey: ["wakeup"],
    queryFn: async () => {
      return await fetchWakeup()
        .then(() => true)
        .catch(() => true);
    },
    retry: false,
  });

  return data ?? false;
}
