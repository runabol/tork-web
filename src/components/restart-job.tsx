'use client';

import { useRouter } from 'next/navigation';

import { Job } from '@/models';
import { Button } from './ui/button';

type Props = {
  job: Job;
};

export default function RestartJob({ job }: Props) {
  const router = useRouter();

  const handleConfirmJobRestart = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/jobs/${job.id}/restart`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      router.refresh();
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Button type="button" variant="outline" onClick={handleConfirmJobRestart}>
      Restart
    </Button>
  );
}
