'use client';

import { useRouter } from 'next/navigation';

import { ScheduledJob } from '@/models';
import { Button } from './ui/button';

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
      router.refresh();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Button
      type="button"
      variant="outlineSuccess"
      size="sm"
      onClick={handleConfirmScheduledJobResume}
    >
      Resume
    </Button>
  );
}
