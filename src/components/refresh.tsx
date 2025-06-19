'use client';

import { useRouter } from 'next/navigation';

import { RefreshCw } from 'lucide-react';

import { Button } from './ui/button';

export default function Refresh() {
  const router = useRouter();

  return (
    <Button type="button" variant="default" onClick={() => router.refresh()}>
      <RefreshCw aria-hidden="true" />
    </Button>
  );
}
