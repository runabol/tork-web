'use client';

import { useRouter } from 'next/navigation';

import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function Refresh() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={() => router.refresh()}
    >
      <ArrowPathIcon className="h-5 w-5 text-black" aria-hidden="true" />
    </button>
  );
}
