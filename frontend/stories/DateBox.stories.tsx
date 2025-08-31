import DateBox from "@/_common/bill/DateBox";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Components/DateBox",
  component: DateBox,
  tags: ["autodocs"],
  argTypes: {
    isFromDate: {
      control: "boolean",
      description: "Whether the date is a from date",
    },
  },
};

export default meta;
type Story = StoryObj;

export const FromDate: Story = {
  args: {
    date: new Date(),
    isFromDate: true,
  },
};

export const ToDate: Story = {
  args: {
    date: new Date(),
    isFromDate: false,
  },
};
