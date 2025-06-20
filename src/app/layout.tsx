import './globals.css';

import Providers from '@/components/core/providers';
import Header from '@/components/header';
import { getClientEnvConfig } from '@/config/env-config';
import { primaryFont } from '../constants/fonts';

import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tork',
  description:
    'Tork is a lightweight, distributed workflow engine that runs tasks as simple scripts within Docker containers.',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const clientEnvConfig = await getClientEnvConfig();

  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${primaryFont.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers envConfig={clientEnvConfig}>
          <Header />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <main className="py-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
