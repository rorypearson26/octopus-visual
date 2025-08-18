import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

async function fetchWakeup() {
  return fetch(`${api}/wakeup`);
}

export function useBackendAwake() {
  const { data } = useQuery({
    queryKey: ["wakeup"],
    queryFn: async () => {
      return await fetchWakeup()
        .then((res) => {
          if (res.ok) {
            return true;
          }
          return false;
        })
        .catch(() => false);
    },
    retry: true,
    refetchInterval: 10_000,
  });

  return data ?? false;
}
