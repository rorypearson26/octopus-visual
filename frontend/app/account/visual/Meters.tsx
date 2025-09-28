import React from 'react';
import { FaBolt, FaFireFlameCurved } from 'react-icons/fa6';

import { Title } from '@mantine/core';

import Meter from './Meter';
import { useMeterIds } from './useMeterIds';

export default function Meters() {
  const { gas_meter_ids, electricity_meter_ids, isSuccess } = useMeterIds();

  const handleClick = () => {
    console.log("Meter clicked");
  };

  if (!isSuccess) return null;

  return (
    <div style={{ maxWidth: 340, margin: "0 auto" }}>
      <Title order={3}>Select a Meter:</Title>
      {gas_meter_ids.map((id) => (
        <React.Fragment key={id}>
          <Meter
            icon={<FaFireFlameCurved size={18} color="purple" />}
            id={id}
            onClick={handleClick}
          />
        </React.Fragment>
      ))}
      {electricity_meter_ids.map((id) => (
        <React.Fragment key={id}>
          <Meter
            icon={<FaBolt size={18} color="purple" />}
            id={id}
            onClick={handleClick}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
