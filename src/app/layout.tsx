import './globals.css';

import Header from '@/components/header';
import { primaryFont } from '../constants/fonts';

import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tork',
  description:
    'Tork is a lightweight, distributed workflow engine that runs tasks as simple scripts within Docker containers.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${primaryFont.className} h-full`}>
        <div>
          <Header />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <main className="py-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
