import Cookies from "js-cookie";
import { useState } from "react";

import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

interface Meters {
  gas_meter_id: string[];
  electricity_meter_id: string[];
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

  const { isSuccess } = useQuery({
    queryKey: ["meters"],
    queryFn: async () => {
      return await fetchMeters(Cookies.get("accountNumber")!).then(
        ({ gas_meter_id, electricity_meter_id }) => {
          if (gas_meter_id.length > 0) {
            setHasGasMeter(true);
          }
          if (electricity_meter_id.length > 0) {
            setHasElectricityMeter(true);
          }
        }
      );
    },
    retry: true,
    refetchInterval: 10_000,
  });

  return {
    hasGasMeter,
    hasElectricityMeter,
    isSuccess,
  };
}
