import Cookies from 'js-cookie';

import api from '@/api/api';
import { useQuery } from '@tanstack/react-query';

interface Meters {
  gas_meter_id: string | null;
  electricity_meter_id: string | null;
}

async function fetchMeters(accountNumber: string): Promise<Meters> {
  const response = await fetch(`${api}/meters/${accountNumber}`);
  if (!response.ok) {
    throw new Error('Failed to fetch meters');
  }
  const data = await response.json();
  return data as Meters;
}

export function useBackendAwake() {
  const { data } = useQuery({
    queryKey: ["wakeup"],
    queryFn: async () => {
      return await fetchMeters(Cookies.get('accountNumber')!)
        .then((res) => {
          if (res.) {
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
