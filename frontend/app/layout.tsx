// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { octopusTheme } from '../theme';
import { QueryProvider } from './QueryProvider';

export const metadata = {
  title: "Octopus Visuals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryProvider>
          <MantineProvider theme={octopusTheme}>
            <Notifications position="top-center" />
            {children}
          </MantineProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
