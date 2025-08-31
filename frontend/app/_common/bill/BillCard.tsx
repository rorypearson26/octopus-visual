import { FaReceipt } from "react-icons/fa";

import {
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";

import DateBox from "./DateBox";

export interface Bill {
  fromDate: Date;
  toDate: Date;
  totalCharge: number;
  billLink: string;
}

interface BillCardProps {
  bill: Bill;
}

function BillCard({ bill }: BillCardProps) {
  return (
    <Card m="md" shadow="md" padding="sm" radius="md" withBorder>
      <Stack>
        <Group justify="space-between">
          <Group>
            <Text fw={700} size="lg">
              Total Charge:
            </Text>
            <Text>£{bill.totalCharge.toFixed(2)}</Text>
          </Group>
          <Button
            leftSection={<FaReceipt size={14} />}
            variant="default"
            component="a"
            href={bill.billLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Bill
          </Button>
        </Group>
        <Divider size="md" color="black" />

        <SimpleGrid cols={2}>
          <DateBox date={bill.fromDate} isFromDate={true} />
          <DateBox date={bill.toDate} isFromDate={false} />
        </SimpleGrid>
      </Stack>
    </Card>
  );
}

export default BillCard;
