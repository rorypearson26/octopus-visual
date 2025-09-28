import { useMemo } from "react";

import { LineChart } from "@mantine/charts";

import { ChartDataPoint } from "./useAccountDetails";

const BillChart = ({ data }: { data: ChartDataPoint[] }) => {
  const chartData = useMemo(() => {
    const sortedData = data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sortedData;
  }, [data]);
  console.log(chartData);
  return (
    <LineChart
      h={300}
      data={data}
      series={[{ name: "value", label: "Bill Amount:" }]}
      dataKey="date"
      type="gradient"
      gradientStops={[
        { offset: 0, color: "red.6" },
        { offset: 50, color: "yellow.6" },
        { offset: 100, color: "lime.5" },
      ]}
      strokeWidth={5}
      curveType="natural"
      valueFormatter={(value) => `£${value}`}
    />
  );
};

export default BillChart;
