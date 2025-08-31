import { format } from "date-fns";
import { FaCalendarDay } from "react-icons/fa";

import { Box, Group, Text } from "@mantine/core";

import { octopusTheme } from "../../../theme";

interface DateBoxProps {
  date: Date;
  isFromDate: boolean;
}

function DateBox({ date, isFromDate }: DateBoxProps) {
  const formattedDate = format(date, "do MMM yyyy");
  const label = isFromDate ? "Date from" : "Date to";

  return (
    <Group>
      <FaCalendarDay size={20} />
      <Text>{label}</Text>
      <Box p={"xs"} bdrs="sm" bg={octopusTheme.colors!.octopusGreen![7]}>
        <Text>{formattedDate}</Text>
      </Box>
    </Group>
  );
}

export default DateBox;
