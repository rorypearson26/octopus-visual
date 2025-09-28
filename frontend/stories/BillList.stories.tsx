import type { Meta, StoryObj } from "@storybook/react-vite";

import BillCards from "../app/_common/bill/BillCards";

const meta: Meta = {
  title: "Components/BillCards",
  component: BillCards,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const bills = [
  {
    fromDate: "2025-01-01",
    toDate: "2025-01-31",
    totalCharge: 120.5,
    billLink: "https://example.com/bill1",
  },
  {
    fromDate: "2025-02-01",
    toDate: "2025-02-28",
    totalCharge: 95.75,
    billLink: "https://example.com/bill2",
  },
];

export const Default: Story = {
  args: {
    bills: bills,
  },
};
