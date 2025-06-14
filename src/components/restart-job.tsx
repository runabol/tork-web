"use client";

import { useRouter } from 'next/navigation';

export default function RestartJob({ job }: { job: Job }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 shadow-sm ring-1 ring-inset ring-green-600/40 hover:bg-green-200"
      onClick={() => {
        fetch(`/api/jobs/${job.id}/restart`, { method: "PUT" })
          .then((res) => res.json())
          .then((data) => {
            router.refresh();
          });
      }}
    >
      Restart
    </button>
  );
}
