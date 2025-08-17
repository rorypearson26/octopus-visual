import { useQuery } from "@tanstack/react-query";

import api from "../api";

async function fetchWakeup() {
  return api.get("/wakeup");
}

export function useBackendAwake() {
  const { isSuccess } = useQuery({
    queryKey: ["wakeup"],
    queryFn: async () => {
      const res = await fetchWakeup();
      if (res.status !== 200) return false;
      return true;
    },
    retry: false,
  });

  return isSuccess;
}
