import Cookies from "js-cookie";

import { Bill } from "@/_common/bill/BillCard";
import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";

interface AccountInfo {
  name: string;
  address: string;
  balance: string;
  bills: Bill[];
}

export interface ChartDataPoint {
  date: Date;
  value: number;
}

interface UseAccountInfo {
  isSuccess: boolean;
  data: AccountInfo;
  chartData: ChartDataPoint[];
}

interface GetAccountRequest {
  account_number: string;
  number_of_bills: number;
}

function processChartData(data: AccountInfo | undefined): ChartDataPoint[] {
  if (data) {
    return data.bills.map((bill) => ({
      date: bill.toDate,
      value: bill.totalCharge,
    }));
  }
  return [];
}

async function fetchAccountDetails({
  account_number,
  number_of_bills,
}: GetAccountRequest): Promise<AccountInfo> {
  const response = await fetch(`${api}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: Cookies.get("authToken")!,
    },
    body: JSON.stringify({ account_number, number_of_bills }),
    cache: "force-cache",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch account details");
  }
  const data = await response.json();
  return data as AccountInfo;
}

export function useAccountDetails(): UseAccountInfo {
  const accountNumber = Cookies.get("accountNumber");
  console.log("accountNumber:", accountNumber);
  const { isSuccess, data } = useQuery({
    queryKey: ["accountDetails", accountNumber!],
    queryFn: async () => {
      return await fetchAccountDetails({
        account_number: accountNumber!,
        number_of_bills: 12,
      });
    },
    retry: true,
    staleTime: 60 * 1000, // 1 minute,
    enabled: !!accountNumber,
  });

  return {
    isSuccess,
    data: data ? data : { name: "", address: "", balance: "", bills: [] },
    chartData: processChartData(data),
  };
}
