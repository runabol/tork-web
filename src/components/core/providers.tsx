'use client';

import { PropsWithChildren } from 'react';

import { ClientEnvConfig } from '@/config/env-config';
import RuntimeEnvConfigContextProvider from '@/context/runtime-env-config-context-provider';

type Props = {
  envConfig: ClientEnvConfig;
};

export default function Providers({
  children,
  envConfig,
}: PropsWithChildren<Props>) {
  return (
    <RuntimeEnvConfigContextProvider envConfig={envConfig}>
      {children}
    </RuntimeEnvConfigContextProvider>
  );
}
