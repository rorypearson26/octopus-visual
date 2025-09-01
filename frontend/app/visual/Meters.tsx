import React from "react";
import { FiDroplet, FiZap } from "react-icons/fi";

import { useMeterIds } from "./useMeterIds";

const Meters: React.FC = () => {
  const { hasElectricityMeter, hasGasMeter } = useMeterIds();

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      {hasGasMeter && <FiDroplet size={24} color="#FFA500" />}
      {hasElectricityMeter && <FiZap size={24} color="#FFD700" />}
    </div>
  );
};

export default Meters;
