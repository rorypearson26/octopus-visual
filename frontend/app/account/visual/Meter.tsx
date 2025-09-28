import { Button, Divider } from '@mantine/core';

type MeterProps = {
  icon: React.ReactNode;
  id: string;
  onClick: () => void;
};

function Meter({ icon, id, onClick }: MeterProps) {
  return (
    <Button
      m="sm"
      radius="sm"
      size="compact-md"
      variant="light"
      style={{
        display: "flex",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <span>{icon}</span>
      <Divider orientation="vertical" mx="sm" />
      <span>{id}</span>
    </Button>
  );
}
export default Meter;
