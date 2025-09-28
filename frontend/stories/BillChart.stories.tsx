import BillChart from "@/account/BillChart";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Components/BillChart",
  component: BillChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const mockData = [
  { date: "2025-01-01", value: 120 },
  { date: "2025-02-01", value: 95 },
  { date: "2025-04-01", value: 130 },
  { date: "2024-04-01", value: 150 },
  { date: "2025-05-01", value: 100 },
  { date: "2025-03-01", value: 110 },
];

export const Default: Story = {
  args: {
    data: mockData,
  },
};
