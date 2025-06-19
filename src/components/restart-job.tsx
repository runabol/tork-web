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
    <Button type="button" variant="secondary" onClick={handleConfirmJobRestart}>
      Restart
    </Button>
  );
}
