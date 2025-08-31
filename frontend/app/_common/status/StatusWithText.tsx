import { useMemo } from 'react';

import { Container, Grid, Text } from '@mantine/core';

import StatusIcon from './Status';

interface StatusProps {
  isEnabled: boolean;
  enabledText?: string;
  loadingText?: string;
}

export default function StatusWithText({
  isEnabled,
  enabledText = "Enabled",
  loadingText = "Loading",
}: StatusProps) {
  const text = useMemo(
    () => (isEnabled ? enabledText : loadingText),
    [isEnabled, enabledText, loadingText]
  );

  return (
    <Container>
      <Grid>
        <Grid.Col span={1} pt={12}>
          <StatusIcon isEnabled={isEnabled} />
        </Grid.Col>
        <Grid.Col span={11}>
          <Text fw={700} size="lg">
            {text}
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
