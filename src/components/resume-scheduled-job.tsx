'use client';

import { useRouter } from 'next/navigation';

import { ScheduledJob } from '@/models';

type Props = {
  job: ScheduledJob;
};

export default function ResumeScheduledJob({ job }: Props) {
  const router = useRouter();

  const handleConfirmScheduledJobResume = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/scheduled-jobs/${job.id}/resume`, {
        method: 'PUT',
      });
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const data = await response.json();
      console.log(data);
      router.refresh();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      className="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 shadow-sm ring-1 ring-inset ring-green-600/40 hover:bg-green-200"
      onClick={handleConfirmScheduledJobResume}
    >
      Resume
    </button>
  );
}
