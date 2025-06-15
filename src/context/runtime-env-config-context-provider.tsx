'use client';

import { createContext, PropsWithChildren } from 'react';

import { ClientEnvConfig } from '@/config/env-config';

type RuntimeEnvConfigContextType = {
  envConfig: ClientEnvConfig;
};

export const RuntimeEnvConfigContext =
  createContext<RuntimeEnvConfigContextType>({} as any);

type Props = {
  envConfig: ClientEnvConfig;
};

export default function RuntimeEnvConfigContextProvider({
  children,
  envConfig,
}: PropsWithChildren<Props>) {
  return (
    <RuntimeEnvConfigContext.Provider value={{ envConfig }}>
      <>{children}</>
    </RuntimeEnvConfigContext.Provider>
  );
}
