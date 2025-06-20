'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { ScheduledJob } from '@/models';

type Props = {
  job: ScheduledJob;
};

export default function PauseScheduledJob({ job }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handlePauseScheduledJob = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/scheduled-jobs/${job.id}/pause`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      router.refresh();
      setOpen(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="warning" size="sm">
          Pause
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <TriangleAlert
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <DialogTitle>Pause Job</DialogTitle>
              <DialogDescription className="mt-2">
                Are you sure you want to pause this scheduled job?
                <span className="font-semibold block mt-2">{job.name}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handlePauseScheduledJob}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
