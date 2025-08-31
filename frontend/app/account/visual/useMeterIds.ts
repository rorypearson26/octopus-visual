import Cookies from 'js-cookie';
import { useState } from 'react';

import api from '@/api/api';
import { useQuery } from '@tanstack/react-query';

interface Meters {
  gas_meter_ids: string[];
  electricity_meter_ids: string[];
}

interface GetMetersRequest {
  account_number: string;
}

async function fetchMeters(accountNumber: string): Promise<Meters> {
  const response = await fetch(`${api}/meters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: Cookies.get("authToken")!,
    },
    body: JSON.stringify({ account_number: accountNumber }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch meters");
  }
  const data = await response.json();
  return data as Meters;
}

export function useMeterIds() {
  const [hasGasMeter, setHasGasMeter] = useState(false);
  const [hasElectricityMeter, setHasElectricityMeter] = useState(false);

  const { isSuccess, data } = useQuery({
    queryKey: ["meters"],
    queryFn: async () => {
      return await fetchMeters(Cookies.get("accountNumber")!).then(
        ({ gas_meter_ids, electricity_meter_ids }) => {
          if (gas_meter_ids.length > 0) {
            setHasGasMeter(true);
          }
          if (electricity_meter_ids.length > 0) {
            setHasElectricityMeter(true);
          }
          return { gas_meter_ids, electricity_meter_ids };
        }
      );
    },
    retry: true,
  });

  const gas_meter_ids = data?.gas_meter_ids ?? [];
  const electricity_meter_ids = data?.electricity_meter_ids ?? [];

  return {
    hasGasMeter,
    hasElectricityMeter,
    electricity_meter_ids,
    gas_meter_ids,
    isSuccess,
  };
}
