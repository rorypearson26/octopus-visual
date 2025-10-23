import api from '@/api/api';
import { useQuery } from '@tanstack/react-query';

async function fetchHealthcheck() {
  return fetch(`${api}/healthcheck`, { method: "HEAD" });
}

export function useHealthcheck() {
  const { data } = useQuery({
    queryKey: ["healthcheck"],
    queryFn: async () => {
      return await fetchHealthcheck()
        .then((res) => {
          console.log(res.headers);
          if (res.ok) {
            return true;
          }
          return false;
        })
        .catch((e) => {
          console.error("Healthcheck error:", e);
          return false;
        });
    },
    retry: true,
    refetchInterval: 10_000,
  });

  return data ?? false;
}
