import { FaCheckCircle } from "react-icons/fa";

import { Loader } from "@mantine/core";

interface StatusProps {
  isEnabled: boolean;
}

export default function StatusIcon({ isEnabled }: StatusProps) {
  if (isEnabled) {
    return <FaCheckCircle color={"green"} size={25} />;
  }
  return <Loader color={"red"} size={20} />;
}
